import React, { useContext, useState } from 'react'
import FirebaseContext from '../../firebase/context'
import Tooltip from "@material-ui/core/Tooltip"


const TaskCard = ({ taskId, chore, assigned, date, isDone, groupId }) => {
  const { firebase, user } = useContext(FirebaseContext)
  const [editing, setEditing] = useState(false)
  const [editedChore, setEditedChore] = useState(chore)
  const [editedAssigned, setEditedAssigned] = useState(assigned)
  const [editedDate, setEditedDate] = useState(date)
  const [editedIsDone] = useState(isDone)

  async function deleteTask() {
    await firebase.firestore
      .collection(`users/${user.uid}/groups/${groupId}/tasks`)
      .doc(taskId)
      .delete()
  }

  async function handleEdits(e) {
    e.preventDefault()
    await firebase.firestore
      .collection(`users/${user.uid}/groups/${groupId}/tasks`)
      .doc(taskId)
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
  // console.log(setEditing,'this is firing')

  return !editing ? (
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
            <Tooltip title="Assign Person">
              <button className="tableActionButtons btn-floating waves-effect waves-light btn blue lighten-1">
                <i className="material-icons">person_add</i>
              </button>
            </Tooltip>

            <Tooltip title="Edit"> 
              <button className="tableActionButtons btn-floating waves-effect waves-light btn  green lighten-1" onClick={toggleEdit}>
                <i className="material-icons">edit</i>
              </button>
            </Tooltip>  

            <Tooltip title="Delete">
              <button className="tableActionButtons btn-floating waves-effect waves-light btn red darken-1" onClick={deleteTask}>
                <i className="material-icons">delete</i>
                
              </button>
            </Tooltip> 
          </th>
        </tr>
  ) : (
    <div>
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
        {/* <input
          type="text"
          placeholder="NOT COMPLETED"
          value={editedIsDone}
          onChange={e => setEditedIsDone(e.target.value)}
        /> */}
        <input type="submit" value="submit" />

        {/* <button onClick={() => setEditing(true)}>submit</button> */}
        <button onClick={() => setEditing(false)}>CANCEL</button>
      </form>
    </div>
  )

  /* This is Ryans work */

  //   return !editing ? (
  //     <div className="TaskCard">
  //       <p>{chore}</p>
  //       <p>{assigned}</p>
  //       <p>{date}</p>
  //       <p>{isDone}</p>
  //       <button onClick={deleteTask}>DELETE</button>
  //       <button onClick={toggleEdit}>EDIT</button>
  //     </div>
  //   ) : (
  //     <form onSubmit={handleEdits}>
  //       <input
  //         type="text"
  //         placeholder={chore}
  //         value={editedChore}
  //         onChange={e => setEditedChore(e.target.value)}
  //       />
  //       <input
  //         type="text"
  //         placeholder={assigned}
  //         value={editedAssigned}
  //         onChange={e => setEditedAssigned(e.target.value)}
  //       />
  //       <input
  //         type="date"
  //         placeholder={date}
  //         value={editedDate}
  //         onChange={e => setEditedDate(e.target.value)}
  //       />
  //       <input
  //         type="text"
  //         placeholder="NOT COMPLETED"
  //         value={editedIsDone}
  //         onChange={e => setEditedIsDone(e.target.value)}
  //       />
  //       <input type="submit" value="submit" />
  //       <button onClick={() => setEditing(false)}>CANCEL</button>
  //     </form>
  // )
}

export default TaskCard
