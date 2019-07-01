import React, { useState } from "react";
import { Link, withrouter } from "react-router";
import useFormValidation from "../components/Auth/useFormValidation";
import validateLogin from "../components/Auth/validateLogin";
import firebase from "../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { uiConfig } from "../../firebase/uiconfig";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login({ history }) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);
  const [authError, setAuthError] = useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      history.push("/");
    } catch (err) {
      console.error("Authentication Error", err);
      setAuthError(err.message);
    }
  }

  return (
    <div className="login-bg">
      <div className="login-button-container">
        <img
          className="logo "
          src={require("../assets/landing-page/png/logo.png")}
          alt="monkey logo"
        />

        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}

export default withRouter(Login);
