import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/Button";
import CartItem from "../cart-item/CartItem";

import "./CartDropdown.scss";

function CartDropdown() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToNavigateHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className="empty-message"> Cart is empty.</span>
        )}
      </div>
      <Button onClick={goToNavigateHandler}>Checkout</Button>
    </div>
  );
}

export default CartDropdown;
