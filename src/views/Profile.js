import React from "react";
import "../../src/styles/profile.css";
import { ReactComponent as InstaIcon } from "../assets/profile-page/Insta.svg";
import { ReactComponent as PhoneIcon } from "../assets/profile-page/Phone.svg";
import { ReactComponent as ThumbIcon } from "../assets/profile-page/Thumb.svg";
import { ReactComponent as TweetIcon } from "../assets/profile-page/Tweet.svg";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="profileContainer">
        <div className="bannerImg">
          <img
            className="profileHeader"
            src={
              "https://images.unsplash.com/photo-1414919823178-e9d9d0afd0ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2892&q=80"
            }
          />
        </div>
        <img src={JSON.parse(localStorage.getItem("user")).photoURL} />
        <h1>
          {" " +
            JSON.parse(localStorage.getItem("user")).displayName.match(
              /^[a-z ,.'-]+$/i
            )[0]}
        </h1>
        <h3>DENVER, CO</h3>
        <div className="socialLinks">
          <PhoneIcon />
          <ThumbIcon />
          <TweetIcon />
          <InstaIcon />
        </div>
        <div className="profileBtn">
          <button className="connectBtn">CONNECT</button>
        </div>
      </div>
    );
  }
}

export default Profile;
