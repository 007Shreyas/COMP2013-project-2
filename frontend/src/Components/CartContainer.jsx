/*
Due Date: 2025-11-21
Course: COMP2013 - Web Programming 2
Project: Project-2 - Grocery App 2.0
Filename: CartContainer.jsx
Main Developer: Professor Ziad Ewais (provided the starter code)
Modified By: Shreyas Bhinkah
Description: This component represents the cart container that displays the list of items added to the cart, along with options to modify quantities and buttons.
             
Resources: Lecture Recordings, React.dev, MDN, W3Schools
*/

import CartCard from "./CartCard";
export default function CartContainer({
  cartList,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
  handleClearCart,
}) {


  return (

    <div className="CartContainer">
      <h2>Cart items: {cartList.length}</h2>
      {cartList.length > 0 ? (
        <>
          {console.log(cartList)}
          {cartList.map((product) => (
            <CartCard
              key={product.id}
              {...product}
              handleRemoveFromCart={handleRemoveFromCart}
              handleAddQuantity={handleAddQuantity}
              handleRemoveQuantity={handleRemoveQuantity}
            />
          ))}
          <div className="CartListBtns">
            <button onClick={() => handleClearCart()} className="RemoveButton">
              Empty Cart
            </button>
            <button id="BuyButton">
              Checkout:{" $"}
              {cartList
                .reduce(
                  (total, item) =>
                    total +
                    parseFloat(item.price.replace("$", "")) * item.quantity,
                  0
                )
                .toFixed(2)}
            </button>
          </div>
        </>
      ) : (
        <h3>No items in cart</h3>
      )}

    </div>
    
  );
}
