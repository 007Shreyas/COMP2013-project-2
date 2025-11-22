/*
Due Date: 2025-11-21
Course: COMP2013 - Web Programming 2
Project: Project-2 - Grocery App 2.0
Filename: product.js
Main Developer: Shreyas Bhinkah
Description: This file is the model that contains the Mongoose schema and model definition for products in the grocery app.
             
Resources: Lecture Recordings, React.dev, MDN, W3Schools
*/


// Initializing mongoose
const mongoose = require("mongoose");
// Defining the schema for the contact model
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

// Creating the model for the contact schema
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
