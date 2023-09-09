import React, { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";
import "./SignInForm.scss";

const defaultFormFields = {
  email: "",
  password: "",
  //leverage firebase auth methods to store this and store store it in db
  //so that even if firebase is hacked passwords are not leaked
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      console.log("ERROR: ", error);

      switch (error.code) {
        case "auth/user-not-found":
          alert("User not Found");
          break;
        case "auth/wrong-password":
          alert("Password incorrect");
          break;
      }
    }
    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <div className="sign-up-form-container">
      <h2>Already have an account ? </h2>
      <span> Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        {/* visual aspect of what user seees in the input is determinded by the value
          if you set the default value ={"abc"} you will see abc in that field */}

        <FormInput
          label={"Email"}
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label={"Password"}
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Google
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
