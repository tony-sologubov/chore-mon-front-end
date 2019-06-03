import React, { useContext, useState } from 'react'
import FirebaseContext from '../../firebase/context'

const TaskCard = ({ id, chore, assigned, date, isDone, gid }) => {
  const { firebase, user } = useContext(FirebaseContext)
  const [editing, setEditing] = useState(false)
  const [editedChore, setEditedChore] = useState(chore)
  const [editedAssigned, setEditedAssigned] = useState(assigned)
  const [editedDate, setEditedDate] = useState(date)
  const [editedIsDone, setEditedIsDone] = useState(isDone)

  async function deleteTask() {
    await firebase.firestore
      .collection(`users/${user.uid}/groups/${gid}/tasks`)
      .doc(`${id}`)
      .delete()
  }

  async function handleEdits(e) {
    e.preventDefault()
    await firebase.firestore
      .collection(`users/${user.uid}/groups/${gid}/tasks`)
      .doc(`${id}`)
      .update({
        chore: editedChore,
        assigned: editedAssigned,
        date: editedDate,
        isDone: editedIsDone
      })
  }

  function toggleEdit() {
    setEditing(true)
  }

  return !editing ? (
    <div className="TaskCard">
      <p>{chore}</p>
      <p>{assigned}</p>
      <p>{date}</p>
      <p>{isDone}</p>
      <button onClick={deleteTask}>DELETE</button>
      <button onClick={toggleEdit}>EDIT</button>
    </div>
  ) : (
    <form onSubmit={handleEdits}>
      <input
        type="text"
        placeholder={chore}
        value={editedChore}
        onChange={e => setEditedChore(e.target.value)}
      />
      <input
        type="text"
        placeholder={assigned}
        value={editedAssigned}
        onChange={e => setEditedAssigned(e.target.value)}
      />
      <input
        type="date"
        placeholder={date}
        value={editedDate}
        onChange={e => setEditedDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="NOT COMPLETED"
        value={editedIsDone}
        onChange={e => setEditedIsDone(e.target.value)}
      />
      <input type="submit" value="submit" />
      <button onClick={() => setEditing(false)}>CANCEL</button>
    </form>
  )
}

export default TaskCard
