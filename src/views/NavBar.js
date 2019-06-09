import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { FirebaseContext } from "../firebase/index";

const NavBar = () => {
  const { firebase, user } = useContext(FirebaseContext);
  return (
    <header>
      <ul className="site-menu">
        <li className={user ? "" : "toggle-link"}>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        {!user ? (
          <li>
            <Link
              to="/login"
              className="waves-effect waves-light dash-btn hoverable"
            >
              Login
            </Link>
          </li>
        ) : (
          <li
            onClick={() => {
              localStorage.clear();
              firebase.logout();
            }}
          >
            <Link
              to="/"
              className="waves-effect waves-light pink-text lighten-5 btn transparent"
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default withRouter(NavBar);
