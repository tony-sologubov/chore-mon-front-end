import firebase from '../../firebase/firebase.js';
import axios from 'axios';
import deleteUserFromDB from './deleteUserFromDb';

const sendToDB = async () => {
  const currentUser = await firebase.auth.currentUser.toJSON();
  const { displayName, email, uid, photoURL, phoneNumber } = currentUser;
  const user = {
    name: displayName,
    email,
    uid,
    profilePicture: photoURL,
    phone: phoneNumber
  };

  let url;
  const development = 'http://localhost:9000/api/users';
  const production = 'https://chore-monkey.herokuapp.com/api/users';
  process.env.NODE_ENV ? (url = development) : (url = production);

  // deleteUserFromDB();

  return await axios.post(url, user);
};

export default sendToDB;
