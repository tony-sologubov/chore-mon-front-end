import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";
import SocialLogins from "./SocialLogins";

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
          {/* <h2 className="mv3">{login ? "Login" : "Create Account"}</h2> */}
          <div className="logo"></div>
          <SocialLogins />
        </div>
        {/* <form onSubmit={handleSubmit} className="flex flex-column">
          {!login && (
            <input
            onChange={handleChange}
            value={values.name}
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="off"
            />
            )}
            <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name="email"
            type="email"
            className={errors.email && "error-input"}
            placeholder="Your email"
            autoComplete="off"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
            <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={errors.password && "error-input"}
            name="password"
            type="password"
            placeholder="Choose a secure password"
            autoComplete="off"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
            {authError && <p className="error-text">{authError}</p>}
            <div className="flex mt3">
            <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            >
            Submit
            </button>
            <button
            type="button"
            className="pointer button"
            onClick={() => setLogin(prevLogin => !prevLogin)}
            >
            {login ? "need to create an account?" : "already have an account?"}
            </button>
            </div>
          </form> */}
        {/* <div className="forgot-password">
          <Link to="/forgot">Forgot Password?</Link>
        </div> */}
      </div>
  );
}

export default Login;