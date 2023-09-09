import React, { useContext, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import "./Navigation.scss";

function Navigation() {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  // const cartDropdownRef = useRef(null);

  // useEffect(
  //   () => {
  //     const handleClickOutsideCart = (event) => {
  //       if (
  //         isCartOpen &&
  //         cartDropdownRef.current &&
  //         !cartDropdownRef.current.contains(event.target)
  //       ) {
  //         setIsCartOpen(!isCartOpen); //toggle cart
  //       }
  //     };
  //     document.addEventListener("mousedown", handleClickOutsideCart);

  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutsideCart);
  //     };
  //   },
  //   isCartOpen,
  //   setIsCartOpen
  // );
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;
