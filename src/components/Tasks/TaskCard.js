import React, { useContext } from 'react'
import FirebaseContext from '../../firebase/context'

const TaskCard = ({ id, chore, assigned, date, isDone, groupRoute }) => {
  const { firebase, user } = useContext(FirebaseContext)

  async function deleteTask() {
    await firebase.firestore
      .collection(`users/${user.uid}/groups/${groupRoute}/tasks`)
      .doc(`${id}`)
      .delete()
  }

  return (
    <div className="TaskCard">
      <p>{chore}</p>
      <p>{assigned}</p>
      <p>{date}</p>
      <p>{isDone}</p>
      <button onClick={deleteTask}>DELETE</button>
    </div>
  )
}

export default TaskCard
