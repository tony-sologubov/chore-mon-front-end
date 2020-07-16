import React, { Component } from "react";
import firebase from "../firebase/firebase";
import axios from "axios";
import Send from "../components/Auth/Send";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateUser = obj => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: obj.name,
        photoURL: obj.profilePicture,
        email: obj.email
      })
      .then(function() {
        const currentUser = firebase.auth.currentUser.toJSON();
        const { displayName, email, uid, photoURL } = currentUser;
        const user = {
          name: displayName,
          email,
          uid,
          profilePicture: photoURL
        };

        let url = `https://tonys-demo-backend.herokuapp.com/api/users/${user.uid}`;

        // deleteUserFromDB();
        localStorage.setItem("uid", JSON.stringify(uid));
        localStorage.setItem("user", JSON.stringify(user));
        return axios
          .put(url, user)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        this.props.history.push("/dashboard");
      });
  };
  render() {
    return (
      <div className="settings">
        <form className="settings-form hundred">
          <h1>Update Your Settings</h1>
          <div className="input-field fifty">
            <input
              id="display-name"
              value={this.state.displayName}
              name="displayName"
              type="text"
              className="validate fifty"
            />
            <label htmlFor="display-name">Display Name</label>
          </div>

          <div className="input-field fifty">
            <input
              value={this.state.email}
              name="email"
              id="email"
              type="text"
              className="validate fifty"
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-field fifty">
            <input
              name="location"
              value={this.state.location}
              id="location"
              type="text"
              className="validate fifty"
            />
            <label htmlFor="location">Location</label>
          </div>

          <button className="fun-button hvr-glow twenty">Submit</button>
        </form>
      </div>
    );
  }
}

export default Settings;

// var user = firebase.auth().currentUser;

// user.updateEmail("user@example.com").then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });

// var user = firebase.auth().currentUser;
// var credential;

// // Prompt the user to re-provide their sign-in credentials

// user.reauthenticateWithCredential(credential).then(function() {
//   // User re-authenticated.
// }).catch(function(error) {
//   // An error happened.
// });
