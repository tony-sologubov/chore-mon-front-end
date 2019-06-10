import React from "react";
import NavBar from "./NavBar";
import { Link, withRouter } from "react-router-dom";
import ScrollableAnchor from "react-scrollable-anchor";
import { ReactComponent as Arrow } from "../assets/landing-page/svg/down.svg";

const Landing = () => {
  return (
    <div className="home">
      <div className="landing">
        <NavBar />
        <div className="cta">
          <h1 className="flow-text">
            Time to Get <br /> Your Bananas <br />
            in a row?
          </h1>
          <div className="store-logos">
            <img
              className="apple hoverable "
              src={require("../assets/landing-page/png/apple-cta.png")}
              alt="apple"
            />
            <img
              className="google hoverable"
              src={require("../assets/landing-page/png/google-play-badge.png")}
              alt="google"
            />
          </div>
        </div>
        <div className="arrow">
          <a href="#section2">
            <Arrow className="asvg hvr-wobble-vertical" />
          </a>
        </div>
      </div>

      <ScrollableAnchor id={"section2"}>
        <div className="section-2">
          <h1> How are you world?</h1>

          <Link to="/billing" className="waves-effect waves-light dash-btn ">
            Go Premium
          </Link>

          <a href="#section3"> Go to section 3 </a>
        </div>
      </ScrollableAnchor>

      <ScrollableAnchor id={"section3"}>
        <div className="section-3"> How are you world? </div>
      </ScrollableAnchor>
    </div>
  );
};

export default Landing;
