import axios from 'axios';

const deleteUserFromDB = async (url, id) => {
  return await axios.delete(`${url}/${id}`);
};

export default deleteUserFromDB;
