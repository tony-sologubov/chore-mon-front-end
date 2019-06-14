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
        <div className="header">
          <div className="coverPhoto">.</div>
          <img
            className="profilePhoto"
            src={JSON.parse(localStorage.getItem("user")).photoURL}
          />
        </div>

        <div className="lower-block">
          <h1 className="profileName">
            {" " +
              JSON.parse(localStorage.getItem("user")).displayName.match(
                /^[a-z ,.'-]+$/i
              )[0]}
          </h1>
          <h3 className="profileLocation">DENVER, CO</h3>
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
      </div>
    );
  }
}

export default Profile;
