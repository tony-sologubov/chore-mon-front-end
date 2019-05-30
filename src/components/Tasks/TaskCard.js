import React, { useContext } from 'react'
import FirebaseContext from '../../firebase/context'

const TaskCard = ({ id, chore, assigned, date, isDone }) => {
  const { firebase, user } = useContext(FirebaseContext)

  async function deleteTask() {
    await firebase.dbFS
      .collection(`users/${user.uid}/tasks`)
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
