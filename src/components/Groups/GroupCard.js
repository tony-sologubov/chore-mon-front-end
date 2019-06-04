import React, { useContext } from "react";
import { Link } from "react-router-dom";

import FirebaseContext from "../../firebase/context";

import ComplexButton from "../ComplexButton";

const GroupCard = ({ groupName, id }) => {
  const { firebase, user } = useContext(FirebaseContext);
  const group = firebase.firestore.collection("groups").doc(id);
  return (
    <div>
      <Link to={`groups/${group}`}>
        <ComplexButton groupName={groupName} />
      </Link>
    </div>
  );
};

export default GroupCard;
