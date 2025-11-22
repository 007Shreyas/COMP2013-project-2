/*
Due Date: 2025-11-21
Course: COMP2013 - Web Programming 2
Project: Project-2 - Grocery App 2.0
Filename: QuantityCounter.jsx
Main Developer: Professor Ziad Ewais (provided the starter code)
Modified By: Shreyas Bhinkah
Description:  This is a reusable component that represents the quantity counter for products in the grocery app (in product section and cart section). It allows users to increase or decrease the quantity of a product in their cart.
Resources: Lecture Recordings, React.dev, MDN, W3Schools
*/


export default function QuantityCounter({
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  id,
  mode,
}) {
  return (
    <div className="ProductQuantityDiv">
      <div>
        <button onClick={() => handleRemoveQuantity(id, mode)}>-</button>
      </div>
      <p>{productQuantity}</p>
      <div>
        <button onClick={() => handleAddQuantity(id, mode)}>+</button>
      </div>
    </div>
  );
}
