import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ComplexButton } from '../Common'
import FirebaseContext from '../../firebase/context'

const GroupCard = ({ group }) => {
  const { firebase, user } = useContext(FirebaseContext)
  const [editedName, setEditedName] = useState('')
  const [editing, setEditing] = useState(false)


  async function handleEditedNameSubmit(e) {
    e.preventDefault()
    firebase.firestore
      .collection(`users/${user.uid}/groups`)
      .doc(group.id)
      .update({ groupName: editedName})
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
        <ComplexButton group={group} />
      </Link>

    </div>
  ) : (
    <form onSubmit={handleEditedNameSubmit}>
      <input

        type="text"
        placeholder={group.name}
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
