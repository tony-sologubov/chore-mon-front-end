import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import ScrollableAnchor from "react-scrollable-anchor";

import { ReactComponent as Arrow } from "../assets/landing-page/svg/down.svg";

import Footer from "../components/Landing/Footer";

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
          <div className="sec-2-top">
            <img
              className="cell"
              src={require("../assets/landing-page/png/section-2-cell.png")}
              alt="iphone"
            />
            <ul className="collection features">
              <li className="collection-item">
                <h3>
                  <i className="small material-icons">list</i>
                  <span className="collection-header">Stay Organized</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  vulputate urna sapien, in consequat enim vestibulum varius.
                  Sed eu arcu rutrum, ullamcorper nunc eget, tempus felis. Proin
                  finibus dui a lacinia eleifend.
                </p>
              </li>
              <li className="collection-item">
                <h3>
                  <i className="small material-icons">people</i>
                  <span className="collection-header">Collaborate</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  vulputate urna sapien, in consequat enim vestibulum varius.
                  Sed eu arcu rutrum, ullamcorper nunc eget, tempus felis. Proin
                  finibus dui a lacinia eleifend.
                </p>
              </li>
              <li className="collection-item">
                <h3>
                  <i className="small material-icons">check_box</i>
                  <span className="collection-header">Simplify</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  vulputate urna sapien, in consequat enim vestibulum varius.
                  Sed eu arcu rutrum, ullamcorper nunc eget, tempus felis. Proin
                  finibus dui a lacinia eleifend.
                </p>
              </li>
            </ul>
          </div>
          <div className="s2-bottom">
            <a href="#section3">
              <Arrow className="asvg  hvr-wobble-vertical" />
            </a>
          </div>
        </div>
      </ScrollableAnchor>

      <ScrollableAnchor id={"section3"}>
        <div className="section-3">
          <div className="subsection-3">
            <h1>Choose Your Plan</h1>
            <div className="panels">
              <div className="card-panel">
                <h3>FREE</h3>

                <h1>
                  <span id="sup">$</span>0<span id="sub">/mo</span>
                </h1>

                <ul class="collection">
                  <li class="collection-item">3 Projects</li>
                  <li class="collection-item">5 Team Members</li>
                  <li class="collection-item">20 Contacts</li>
                  <li class="collection-item">1000 Messages</li>
                </ul>
                <Link to="/billing" className="waves-effect waves-light  ">
                  <button className="btn-large  pink hvr-shutter-out-vertical">
                    GET STARTED
                  </button>
                </Link>
              </div>
              <div className="card-panel">
                <h3>PREMIUM</h3>
                <h1>
                  <span id="sup">$</span>10<span id="sub">/mo</span>
                </h1>

                <ul class="collection">
                  <li class="collection-item">10 Projects</li>
                  <li class="collection-item">25 Team Members</li>
                  <li class="collection-item">200 Contacts</li>
                  <li class="collection-item">10000 Messages</li>
                </ul>
                <Link to="/billing" className="waves-effect waves-light  ">
                  <button className="btn-large  white  hvr-shutter-out-vertical">
                    GET STARTED
                  </button>
                </Link>
              </div>
              <div className="card-panel">
                <h3>PLATINUM</h3>
                <h1>
                  <span id="sup">$</span>20<span id="sub">/mo</span>
                </h1>
                <ul class="collection">
                  <li class="collection-item">Ultd Projects</li>
                  <li class="collection-item">Ultd Team Members</li>
                  <li class="collection-item">Ultd Contacts</li>
                  <li class="collection-item">Ultd Messages</li>
                </ul>
                <Link to="/billing" className="waves-effect waves-light  ">
                  <button className="btn-large pink hvr-shutter-out-vertical">
                    GET STARTED
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollableAnchor>
      <Footer />
    </div>
  );
};

export default Landing;
