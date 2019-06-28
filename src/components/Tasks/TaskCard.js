import React, { useContext, useState } from 'react'
import FirebaseContext from '../../firebase/context'
import Tooltip from "@material-ui/core/Tooltip"
import TaskModal from './TaskModal'
import ProfilePhotoTask from './TaskAvatar'
// import GetTasks from './GetTasks';



const TaskCard = ({ taskId, chore, assigned, date, isDone, groupId, members}) => {
  const { firebase, user } = useContext(FirebaseContext)
  // const [editing, setEditing] = useState(false)
  // const [editedChore, setEditedChore] = useState(chore)
  // const [editedAssigned, setEditedAssigned] = useState(assigned)
  // const [editedDate, setEditedDate] = useState(date)
  // const [editedIsDone] = useState(isDone)

  async function deleteTask() {
    await firebase.firestore
      .collection(`users/${user.uid}/groups/${groupId}/tasks`)
      .doc(taskId)
      .delete()
  }

  const member = members.filter(member => member.id == assigned)[0]
  // async function handleEdits(e) {
  //   e.preventDefault()
  //   await firebase.firestore
  //     .collection(`users/${user.uid}/groups/${groupId}/tasks`)
  //     .doc(taskId)
  //     .update({
  //       chore: editedChore,
  //       assigned: editedAssigned,
  //       date: editedDate,
  //       isDone: editedIsDone
  //     })
  // }

  // function toggleEdit() {
  //   setEditing(true)
  // }
  console.log(members)
  // console.log(this.props.members)

  return  (
        <tr>
          <th className="switch" >       
            <label>
              <input type="checkbox"></input>
              <span className="checked"></span>          
            </label>
                    
          </th>
          <th>{chore}</th>
          <th>{<ProfilePhotoTask 
                            user={member}
                            onClick={"event => this.handleAssignClick(member)"}/>}</th>
          <th>{date}</th>
          <th>
            <Tooltip title="Assign Person">
              <button className="tableActionButtons btn-floating waves-effect waves-light btn blue lighten-1">
                <i className="material-icons">person_add</i>
              </button>
            </Tooltip>

            <Tooltip title="Edit"> 
              <span>
                <TaskModal
                taskId={taskId}
                chore={chore}
                date={date}
                isDone={isDone}
                assigned={assigned}
                groupId={groupId}
                />
              </span>
            </Tooltip>  

            <Tooltip title="Delete">
              <button className="tableActionButtons btn-floating waves-effect waves-light btn red darken-1" onClick={deleteTask}>
                <i className="material-icons">delete</i>
                
              </button>
            </Tooltip>
          </th>
        </tr>
  )
}

export default TaskCard
