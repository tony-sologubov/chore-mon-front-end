import firebase from "./firebase";
import axios from "axios";

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  callbacks: {
    signInSuccess: async user => {
      console.log("SENDING..");

      console.log(user);
      const newUser = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        profilePicture: user.photoURL
      };

      console.log(newUser);

      let url = "https://tonys-demo-backend.herokuapp.com/api/users";

      // deleteUserFromDB();
      localStorage.setItem("uid", JSON.stringify(user.uid));
      localStorage.setItem("user", JSON.stringify(newUser));
      await axios
        .post(`${url}`, newUser)
        .then(res => {
          console.log("this is what is being sent", newUser);
          console.log(res);
          window.location.reload();
        })
        .catch(err => {
          console.log("this is what is being sent", newUser);
          console.log(err);
        });
    },
    signInSuccessUrl: "/",
    tosUrl: `/dashboard`
  },
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.googleProvider.providerId,
    firebase.facebookProvider.providerId,
    firebase.twitterProvider.providerId,
    firebase.githubProvider.providerId,
    firebase.emailProvider.providerId,
    firebase.phoneProvider.providerId

    // firebase.microsoftProvider.providerId,
    // firebase.guestProvider.providerId
  ]
};
