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
          <th className="switch" >
            <label>
              <input type="checkbox"></input>
              <span className="checked"></span>          
            </label>
          </th>
          <th >{chore}</th>
          <th>{assigned}</th>
          <th>{date}</th>
          <th>
            <button className="tableActionButtons btn-floating waves-effect waves-light btn blue lighten-1">
              <i className="material-icons">person_add</i>
            </button>
              
            <button className="tableActionButtons btn-floating waves-effect waves-light btn  green lighten-1">
              <i className="material-icons">edit</i>
            </button>

            <button className="tableActionButtons btn-floating waves-effect waves-light btn red darken-1" onClick={deleteTask}>
              <i className="material-icons">delete</i>
            </button>
          </th>
        </tr>
  )
}

export default TaskCard