import firebase from "../../firebase/firebase.js";
import axios from "axios";

const sendToDB = () => {
  const currentUser = firebase.auth.currentUser.toJSON();
  const { displayName, email, uid, photoURL } = currentUser;
  const user = {
    name: displayName,
    email,
    uid,
    profilePicture: photoURL
  };

  console.log("User:", user);

  let url = "https://chore-monkey.herokuapp.com/api/users";

  // deleteUserFromDB();
  localStorage.setItem("uid", JSON.stringify(uid));
  localStorage.setItem("user", JSON.stringify(user));
};

export default sendToDB;
