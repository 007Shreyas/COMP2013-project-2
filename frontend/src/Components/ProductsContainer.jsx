/*
Due Date: 2025-11-21
Course: COMP2013 - Web Programming 2
Project: Project-2 - Grocery App 2.0
Filename: ProductsContainer.jsx
Main Developer: Professor Ziad Ewais (provided the starter code)
Modified By: Shreyas Bhinkah
Description:  This component represents a container for displaying a list of product cards. It receives product data and various handler functions as props and maps through the products to render individual ProductCard components.
Resources: Lecture Recordings, React.dev, MDN, W3Schools
*/

import ProductCard from "./ProductCard";

export default function ProductsContainer({
  products,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productQuantity,
  handleEditProduct,
  handleDeleteProduct,
}) {

  return (
    <div className="ProductsContainer">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={
            productQuantity.find((p) => p.id === product.id).quantity
          }
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      ))}

    </div>
  );
}
