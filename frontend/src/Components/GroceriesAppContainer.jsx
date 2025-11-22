/*
Due Date: 2025-11-21
Course: COMP2013 - Web Programming 2
Project: Project-2 - Grocery App 2.0
Filename: GroceriesAppContainer.jsx
Main Developer: Professor Ziad Ewais (provided the starter code)
Modified By: Shreyas Bhinkah
Description: This is the main parent component of the Grocery App. It manages all global state (products, cart, form),
            communicates with the backend API via axios, handles CRUD operations, and passes data + handlers down 
             to child components (NavBar, ProductForm, ProductsContainer, CartContainer).
             It is a 2.0 version with some new added features like CRUD operations and retrieval of data from database compared to project-1.
             
Resources: Lecture Recordings, React.dev, MDN, W3Schools
*/

import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";


export default function GroceriesAppContainer() {

   // Manages the quantity selected for each product before adding to cart
  const [productQuantity, setProductQuantity] = useState([]);
  // Manages the current items in the shopping cart
  const [cartList, setCartList] = useState([]);
  // Manages the full list of products fetched from the database (mongodb)
  const [productList, setProductList] = useState([]);
  // Manages response message after POST/PATCH/DELETE operations
  const [postResponse, setPostResponse] = useState("");
  // Responsible for the editing of an existing product or adding a new one in form.
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  // Manages the state to know whether the form is in Editing mode or adding a new product mode
  const [isInEditMode, setInEditMode] = useState(false);

  // Fetches all products whenever a product is added, updated, or deleted
  useEffect(() => {
    handleAllProductsList();
  }, [postResponse]);

  // Initializes quantity state when products are first loaded
  const productQuantityInitializer = (prods) =>
    prods.map((prod) => { return { id: prod.id, quantity: 0 }; });

  
  // Loads products from the database and initializes their quantities
  const handleAllProductsList = async () => {
    const result = await axios.get("http://localhost:3000/products");
    setProductList(result.data);
    setProductQuantity(productQuantityInitializer(result.data));
  };

  // Logic for Increasing quantity in either product list or cart
  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      setCartList(cartList.map(p => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p));
    } else if (mode === "product") {
      setProductQuantity(productQuantity.map(p => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p));
    }
  };

  // Logic for Decreasing quantity in either product list or cart
  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      setCartList(cartList.map(p => 
        p.id === productId && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
      ));
    } else if (mode === "product") {
      setProductQuantity(productQuantity.map(p => 
        p.id === productId && p.quantity > 0 ? { ...p, quantity: p.quantity - 1 } : p
      ));
    }
  };

  
  // Adds the selected product and its quantity to the cart list
  const handleAddToCart = (productId) => {
    const product = productList.find(p => p.id === productId);
    const pQuantity = productQuantity.find(p => p.id === productId);

    if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
      return;
    }

    const existing = cartList.find(p => p.id === productId);
    if (existing) {
      existing.quantity += pQuantity.quantity;
      setCartList([...cartList]);
    } else {
      setCartList([...cartList, { ...product, quantity: pQuantity.quantity }]);
    }
  };

  // Removes a product entirely from the cart list
  const handleRemoveFromCart = (productId) => {
    setCartList(cartList.filter(p => p.id !== productId));
  };

  // EmptyCart - Clears the entire cart
  const handleClearCart = () => {
    setCartList([]);
  };


  // Updates Form Data state as user types in the Product Form
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles both Adding New Product and Updating Existing Product submission in the form
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (isInEditMode) {
      await handleUpdateProduct(formData._id);
      setInEditMode(false);
    } else {
      const result = await axios.post("http://localhost:3000/add-product", formData);
      setPostResponse(result.data); 
    }

    // Resets form after submission
    setFormData({ productName: "", brand: "", image: "", price: "" });
  };

  
  // Populates the form with existing product data when "Edit" button is clicked
  const handleEditProduct = (product) => {
    setFormData({
      _id: product._id,
      brand: product.brand,
      productName: product.productName,
      price: product.price,
      image: product.image,      
    });
    setInEditMode(true);
    setPostResponse(""); 
  };

  
   // Sends PATCH request to update a product
  const handleUpdateProduct = async (productId) => {
    const result = await axios.patch(
      `http://localhost:3000/products/${productId}`, formData );
    setPostResponse(result.data);
  };

  // Sends DELETE request to remove a product
  const handleDeleteProduct = async (productId) => {
    const result = await axios.delete(`http://localhost:3000/products/${productId}`);
    setPostResponse(result.data); 
  };

  // Renders the full app layout 
  return (
    <div>

      {/* Navigation bar */}
      <NavBar quantity={cartList.length} />

      {/* Main div that contains app content*/}
      <div className="GroceriesApp-Container">

        {/*The Form to add or edit products */}
        <ProductForm
          handleOnSubmit={handleOnSubmit}
          postResponse={postResponse}
          handleOnChange={handleOnChange}
          formData={formData}
          isInEditMode={isInEditMode}
        />

        {/* List of all products with add,remove,addtocart,edit and delete controls */}
        <ProductsContainer
          products={productList}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />

        {/* List of all product in Shopping cart and add,remove,removefromcart,emptycart controls */}
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />

      </div>
    </div>

  );
}