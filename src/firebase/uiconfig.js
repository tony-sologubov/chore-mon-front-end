import firebase from "./firebase";

export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/dashboard',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.googleProvider.providerId,
      firebase.facebookProvider.providerId,
      firebase.twitterProvider.providerId,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };