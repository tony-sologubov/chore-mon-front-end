import React from "react";
import logo from "../assets/landing-page/png/logo.png";

const InProgress = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "pink" }}>We're Actually Not Sorry</h1>

      <img src={logo} alt="monkey" style={{ maxHeight: "75vh"}} />
      <h3>
        One of our developers needs a nap and the other one crashed our program.
        We will get around to this page when we have time. If you don't like it,
        you are welcome to call our customer satisfaction department.
      </h3>
    </div>
  );
};

export default InProgress;
