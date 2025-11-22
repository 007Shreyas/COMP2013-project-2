/*
Due Date: 2025-11-21
Course: COMP2013 - Web Programming 2
Project: Project-2 - Grocery App 2.0
Filename: ProductCard.jsx
Main Developer: Professor Ziad Ewais (provided the starter code)
Modified By: Shreyas Bhinkah
Description: This component represents an individual product card displaying product details such as name, brand, image, price, and quantity controls. It also includes an "Add to Cart" button.
Resources: Lecture Recordings, React.dev, MDN, W3Schools
*/

import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  id,
  handleEditProduct,
  handleDeleteProduct,
  _id,
  
}) {
  return (

    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt="" />
      <h4>{brand}</h4>
      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="product"
      />
      <h3>{price}</h3>

      <button id="AddToCartButton" onClick={() => handleAddToCart(id)}>Add to Cart</button>

       
      <button id="EditButton" onClick={() =>
          handleEditProduct({ _id,  productName, brand, price, image })}>Edit</button>
      
      <button className="RemoveButton" onClick={() => handleDeleteProduct(_id)}>
        Delete
      </button>

    </div>
  );
}
