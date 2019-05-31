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
        <tr>
          <th >{chore}</th>
          <th>{assigned}</th>
          <th>{date}</th>
          <th className="switch" >
            <label>
              off
              <input type="checkbox"></input>
              <span className="lever"></span>
              on
            </label>
          </th>
          <th>
            <button className="btn-floating waves-effect waves-light btn blue darken-1">B</button>
            <button className="btn-floating waves-effect waves-light btn green darken-1">G</button>
            <button className="btn-floating waves-effect waves-light btn red darken-1" onClick={deleteTask}>X</button>
          </th>
        </tr>
  )
}

export default TaskCard