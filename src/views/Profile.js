import React from 'react';
import '../../src/styles/profile.css';
import { ReactComponent as InstaIcon } from '../assets/profile-page/Insta.svg';
import { ReactComponent as PhoneIcon } from '../assets/profile-page/Phone.svg';
import { ReactComponent as ThumbIcon } from '../assets/profile-page/Thumb.svg';
import { ReactComponent as TweetIcon } from '../assets/profile-page/Tweet.svg';
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
          {JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts'))[0]
            .photoUrl !== null ? (
            <img
              className="profilePhoto"
              alt="profile"
              src={
                JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts'))[0]
                  .photoUrl
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
            {' ' +
              JSON.parse(
                localStorage.getItem('firebaseui::rememberedAccounts')
              )[0].displayName.match(/^[a-z ,.'-]+$/i)[0]}
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
