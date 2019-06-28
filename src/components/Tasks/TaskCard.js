import React, { useContext, useState } from 'react'
import FirebaseContext from '../../firebase/context'
import Tooltip from "@material-ui/core/Tooltip"
import TaskModal from './TaskModal'
import ProfilePhotoTask from './TaskAvatar'
// import GetTasks from './GetTasks';



const TaskCard = ({ taskId, title, assignedTo, dueDate, isComplete, groupId, members}) => {

  const member = members.filter(member => member.uid == assignedTo)[0]
  // async function handleEdits(e) {
  //   e.preventDefault()
  //   await firebase.firestore
  //     .collection(`users/${user.uid}/groups/${groupId}/tasks`)
  //     .doc(taskId)
  //     .update({
  //       title: editedtitle,
  //       assignedTo: editedAssigned,
  //       dueDate: editedDate,
  //       isComplete: editedIsDone
  //     })
  // }

  async function deleteTask() {
   console.log("delete here")
  }

  // function toggleEdit() {
  //   setEditing(true)
  // }
  console.log(members)
  console.log(title)
  console.log(member)
  // console.log(this.props.members)

  return  (
        <tr>
          <th className="switch" >       
            <label>
              <input type="checkbox"></input>
              <span className="checked"></span>          
            </label>
                    
          </th>
          <th>{title}</th>
          <th>{<ProfilePhotoTask 
                            user={member}
                            onClick={"event => this.handleAssignClick(member)"}/>}</th>
          <th>{dueDate}</th>
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
                title={title}
                dueDate={dueDate}
                isComplete={isComplete}
                assignedTo={assignedTo}
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
