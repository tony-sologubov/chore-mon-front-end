import firebase from '../../firebase/firebase.js';
import axios from 'axios';

export default async function sendUserToDB() {
  const currentUser = await firebase.auth.currentUser.toJSON();
  const { displayName, email, uid, photoURL, phoneNumber } = currentUser;
  const user = {
    name: displayName,
    email,
    uid,
    profilePicture: photoURL,
    phone: phoneNumber
  };

  return await axios.post('http://localhost:9000/api/users', user);
}
