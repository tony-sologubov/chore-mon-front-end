import firebase from '../../firebase/firebase.js';
import axios from 'axios';
export const sendToDB = async () => {
  const currentUser = await firebase.auth.currentUser.toJSON();
  const { displayName, email, uid, photoURL, phoneNumber } = currentUser;
  const user = {
    name: displayName,
    email,
    uid,
    profilePhoto: photoURL,
    phone: phoneNumber
  };

  let url;
  const development = 'http://localhost:9000/api/users';
  const production = 'https://chore-monkey.herokuapp.com/api/users';
  process.env.NODE_ENV ? (url = development) : (url = production);

  return await axios.post(url, user);
};
