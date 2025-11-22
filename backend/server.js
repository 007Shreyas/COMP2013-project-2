/*
Due Date: 2025-11-21
Course: COMP2013 - Web Programming 2
Project: Project-2 - Grocery App 2.0
Filename: server.js
Main Developer: Shreyas Bhinkah
Description: this is the Backend server file to handle all API requests for the Grocery App 2.0.              
Resources: Lecture Recordings, React.dev, MDN, W3Schools
*/


// Sets up Express, CORS, and environment variables (.env)
// Also Initiates the server and connect to the database
const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
require("dotenv").config();
const { DB_URI } = process.env;

// Middleware 
server.use(cors());                           
server.use(express.json());                   
server.use(express.urlencoded({ extended: true })); 

// Connects to MongoDB and starts server
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
server.get("/", (request, response) => {
  response.send("LIVE!");
});

// GET /products - Fetches all products
// Retrieves every product from the database and sends as JSON
server.get("/products", async (request, response) => {
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

// POST /add-product - Adds a new product
server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const product = new Product({
    id: Date.now(), 
    productName,
    brand,
    price,
    image  
  });
  try {
    await product
      .save()
      .then((result) => response.status(201).send("Product is added successfully!!!"));
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE /products/:id - Removes a product by MongoDB _id and permanently deletes it
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id).then((result) =>
      response.status(200).send("Product has been deleted successfully!")
    );
  } catch (error) {
    console.log(error.message);
  }
});

// PATCH /products/:id - Update a product by MongoDB _id
// Updates selected fields of an existing product and returns a message
server.patch("/products/:id", async (request, response) => {
  const prodId = request.params.id;
  const { id, productName, brand, price, image,  } = request.body;

  try {
    await Product.findByIdAndUpdate(prodId, {
      id,
      productName,
      brand,
      price,
      image,
    }).then((result) => response.status(200).send("Product has been updated successfully!!!"));
  } catch (error) {
    console.log(error.message);
  }
});