import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./Checkout.scss";

const Card12 = ({ item, decreaseQuantity, increaseQuantity }) => {
  console.log("===>", item);
  const { name, imageUrl, id, quantity, price } = item;
  return (
    <div className="item-details-grid">
      <img
        src={imageUrl}
        alt="name"
        style={{ width: "120px", height: "150px" }}
      />
      <span>{name}</span>
      <div>
        <span onClick={decreaseQuantity(id)}>&lt; </span>
        <span>{quantity}</span>
        <span onClick={increaseQuantity()}> &gt; </span>
      </div>
      <span>{price}</span>
    </div>
  );
};

function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const decreaseQuantity = (id) => {
    return cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
  };

  const increaseQuantity = (id) => {
    return cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
  };

  return (
    <div className="checkout-page-container">
      <div className="item-details-grid">
        <span className="title">Product</span>
        <span className="title">Description</span>
        <span className="title">Quantity</span>
        <span className="title">Price</span>
        <span className="title">Remove</span>
      </div>

      {cartItems &&
        cartItems.map((item) => {
          console.log("-->", item);
          return (
            <Card12
              item={item}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
            />
          );
        })}
    </div>
  );
}

export default Checkout;
