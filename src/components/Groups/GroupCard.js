import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ComplexButton } from '../Common'
import FirebaseContext from '../../firebase/context'

const GroupCard = ({ groupName, id }) => {
  const { firebase, user } = useContext(FirebaseContext)
  const [editedName, setEditedName] = useState('')
  const [editing, setEditing] = useState(false)

  const group = firebase.firestore.collection('groups').doc(id)

  async function handleEditedNameSubmit(e) {
    e.preventDefault()
    firebase.firestore
      .collection(`users/${user.uid}/groups`)
      .doc(group.id)
      .update({ groupName: editedName })
  }

  async function deleteGroup() {
    try {
      await firebase.firestore
        .collection(`users/${user.uid}/groups`)
        .doc(group.id)
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
        <ComplexButton groupName={groupName} />
      </Link>
      <button type="submit" 
      value="submit" 
      className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical"
      onClick={deleteGroup}>
      DELETE
      </button>
      <button type="submit" 
      value="submit" 
      className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical"
      onClick={toggleEdit}>
      EDIT
      </button>
    </div>
  ) : (
    <form onSubmit={handleEditedNameSubmit}>
      <input
      
        type="text"
        placeholder={groupName}
        value={editedName}
        onChange={e => setEditedName(e.target.value)}
      />
      <input 
      className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical" 
      type="submit" 
      value="submit" 
      />
    </form>
  )
}

export default GroupCard
