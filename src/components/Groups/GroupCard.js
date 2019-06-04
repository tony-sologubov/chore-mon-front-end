import React, { useContext } from "react";
import { Link } from "react-router-dom";
import contentEditable from "../../utils/contentEditable";
import FirebaseContext from "../../firebase/context";

import ComplexButton from "../ComplexButton";

const GroupCard = ({ groupName }) => {
  let Span = contentEditable("span");
  const group = groupName.split(" ").join("");
  const { firebase, user } = useContext(FirebaseContext);

  const group = firebase.firestore.collection('groups').doc(id)

  async function handleEditedNameSubmit(e) {
    e.preventDefault()
    console.log(id)
    firebase.firestore
      .collection(`users/${user.uid}/groups`)
<<<<<<< HEAD
      .doc(`${group}`)
      .delete();
=======
      .doc(`${group.id}`)
      .update({ groupName: editedName })
  }

  async function deleteGroup() {
    try {
      await firebase.firestore
        .collection(`users/${user.uid}/groups`)
        .doc(`${group.id}`)
        .delete()
    } catch (err) {
      console.log({ message: err.message, code: err.code })
    }
  }

  function toggleEdit() {
    setEditing(true)
>>>>>>> master
  }

  return !editing ? (
    <div className="group-card">
<<<<<<< HEAD
      <Link to={`groups/${group}`}>
        <ComplexButton groupName={groupName} />
      </Link>
    </div>
  );
};
=======
      <Link to={`groups/${group.id}`}>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{groupName}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <button onClick={deleteGroup}>DELETE</button>
      <button onClick={toggleEdit}>EDIT</button>
    </div>
  ) : (
    <form onSubmit={handleEditedNameSubmit}>
      <input
        type="text"
        placeholder={groupName}
        value={editedName}
        onChange={e => setEditedName(e.target.value)}
      />
      <input type="submit" value="submit" />
    </form>
  )
}
>>>>>>> master

export default GroupCard;
