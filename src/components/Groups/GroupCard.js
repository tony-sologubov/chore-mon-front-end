import React, { useContext } from "react";
import { Link } from "react-router-dom";
import contentEditable from "../../utils/contentEditable";
import FirebaseContext from "../../firebase/context";

import ComplexButton from "../ComplexButton";

const GroupCard = ({ groupName }) => {
  let Span = contentEditable("span");
  const group = groupName.split(" ").join("");
  const { firebase, user } = useContext(FirebaseContext);

  async function deleteGroup() {
    await firebase.firestore
      .collection(`users/${user.uid}/groups`)
      .doc(`${group}`)
      .delete();
  }
  async function editGroup() {}
  return (
    <div className="group-card">
      <Link to={`groups/${group}`}>
        <ComplexButton groupName={groupName} />
      </Link>
    </div>
  );
};

export default GroupCard;
