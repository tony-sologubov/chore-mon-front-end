import firebase from "../../firebase/firebase.js";
import axios from "axios";

const Send = () => {
  console.log("SENDING..");
  const currentUser = firebase.auth.currentUser.toJSON();

  console.log(currentUser);
  const { displayName, email, uid, photoURL } = currentUser;
  const user = {
    name: displayName,
    email,
    uid,
    profilePicture: photoURL
  };

  let url = "https://uffizzi-test.herokuapp.com/api/users";

  // deleteUserFromDB();
  localStorage.setItem("uid", JSON.stringify(user.uid));
  localStorage.setItem("user", JSON.stringify(user));
  axios
    .post(`${url},${user}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export default Send;
