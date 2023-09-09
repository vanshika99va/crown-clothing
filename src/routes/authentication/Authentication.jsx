import React from "react";
import SignUpForm from "../../components/sign-up-form/SignUpForm";
import SignInForm from "../../components/sign-in-form/SignInForm";
import "./Authentication.scss";

function Authentication() {
  // When user somes back from another tab to app..the sign in page will re render and mount again
  // >auth< is helping us keep the track of all the authentication state for website and firebase ; regardless of here we go
  //hence we need the auth details (during redirect) when mounted

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}

export default Authentication;

//Error (auth/popup-closed-by-user)
