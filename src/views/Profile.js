import React from "react";
import "../../src/styles/profile.css";
import { ReactComponent as InstaIcon } from "../assets/profile-page/Insta.svg";
import { ReactComponent as PhoneIcon } from "../assets/profile-page/Phone.svg";
import { ReactComponent as ThumbIcon } from "../assets/profile-page/Thumb.svg";
import { ReactComponent as TweetIcon } from "../assets/profile-page/Tweet.svg";
import axios from "axios";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = id => {
    axios
      .get(`https://uffizzi-test.herokuapp.com/api/users/${id}`)
      .then(res => {
        this.setState({
          name: res.data.name,
          uid: res.data.uid,
          location: res.data.location,
          profilePicture: res.data.profilePicture,
          coverPhoto: res.data.coverPhoto
        });
      });
  };
  render() {
    return (
      <div className="profileContainer">
        <div className="header">
          <div className="coverPhoto">.</div>
          {JSON.parse(localStorage.getItem("user"))
            .photoURL !== null ? (
            <img
              className="profilePhoto"
              alt="profile"
              src={
                JSON.parse(
                  localStorage.getItem("user")
                ).photoURL
              }
            />
          ) : (
            <img
              src="https://res.cloudinary.com/ryanboris/image/upload/v1561535196/profileplaceholder.png"
              alt="placeholder"
              width="150"
              height="200"
              className="placeholderPhoto"
            />
          )}
        </div>

        <div className="lower-block">
          <h1 className="profileName">
            {" " +
              JSON.parse(
                localStorage.getItem("user")
              ).displayName.match(/[^\s,.'"!?]+/)[0]}
          </h1>
          <h3 className="profileLocation">DENVER, CO</h3>
          <div className="socialLinks">
            <PhoneIcon className="hvr-push" />
            <ThumbIcon className="hvr-push" />
            <TweetIcon className="hvr-push" />
            <InstaIcon className="hvr-push" />
          </div>
          <div className="profileBtn">
            <button className="connectBtn hvr-push">CONNECT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
