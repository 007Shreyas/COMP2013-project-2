/*
Due Date: 2025-11-21
Course: COMP2013 - Web Programming 2
Project: Project-2 - Grocery App 2.0
Filename: CartCard.jsx
Main Developer: Professor Ziad Ewais (provided the starter code)
Modified By: Shreyas Bhinkah
Description: This component represents an individual card in the shopping cart, displaying product details and buttons.
             
Resources: Lecture Recordings, React.dev, MDN, W3Schools
*/



import QuantityCounter from "./QuantityCounter";

export default function CartCard({
  id,
  image,
  productName,
  price,
  quantity,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
}) {

  return (

    <div className="CartCard">
      <div className="CartCardInfo">
        <img src={image} alt="" />
        <p>{productName}</p>
        <p>{price}</p>
        <QuantityCounter
          id={id}
          productQuantity={quantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          mode="cart"
        />
        
      </div>

      <div>
        <h3>
          Total: ${(parseFloat(price.replace("$", "")) * quantity).toFixed(2)}
        </h3>
        <button
          onClick={() => handleRemoveFromCart(id)}
          className="RemoveButton"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
