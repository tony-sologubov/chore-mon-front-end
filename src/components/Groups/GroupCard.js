import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import FirebaseContext from '../../firebase/context'

const GroupCard = ({ groupName, id }) => {
  const { firebase, user } = useContext(FirebaseContext)
  const [editedName, setEditedName] = useState('')
  const [editing, setEditing] = useState(false)

  const group = firebase.firestore.collection('groups').doc(id)

  async function handleEditedNameSubmit(e) {
    e.preventDefault()
    console.log(id)
    firebase.firestore
      .collection(`users/${user.uid}/groups`)
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
  }

  return !editing ? (
    <div className="group-card">
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

export default GroupCard
