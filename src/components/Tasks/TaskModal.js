import React, { useContext, useState } from 'react'
import FirebaseContext from '../../firebase/context'
// import Date from '../Tasks/Date'
// import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfilePhotoTask from './TaskAvatar'

const  TaskModal = ({ taskId, chore, assigned, date, isDone, groupId }) => {
const { firebase, user } = useContext(FirebaseContext)
const [editing, setEditing] = useState(false)
const [editedChore, setEditedChore] = useState(chore)
const [editedAssigned, setEditedAssigned] = useState(assigned)
const [editedDate, setEditedDate] = useState(date)
// const [userName, setUserName] = useState(user)
// const [editedIsDone, setEditedIsDone] = useState(isDone)
const [open, setOpen] = React.useState(false);
// const user = JSON.parse(localStorage.getItem('user')).displayName.match(/[^\s,.'"!?]+/)[0];

const handleOpen = () => {
setOpen(true);

};

const handleClose = () => {
setOpen(false);
};

    async function handleEdits(e) {
    e.preventDefault()
    await firebase.firestore
    .collection(`users/${user.uid}/groups/${groupId}/tasks`)
    .doc(taskId)
    .update({
    chore: editedChore,
    assigned: editedAssigned,
    date: editedDate,
    // isDone: editedIsDone
    })
}

function toggleEdit() {
setEditing(true);
// setOpen(true);

}
// console.log(toggleEdit, 'its firing part 1');
// console.log(handleOpen, 'its firing part 2');
// console.log(handleClose, 'its firing part 3');

return !editing ? (
    <span onClick={toggleEdit}>
      <button 
          className="tableActionButtons btn-floating waves-effect waves-light btn  green lighten-1"
          onClick={handleOpen}>
      <i className="material-icons" onClick={toggleEdit}>edit</i>
      </button>
    </span>
  ):(
  <span>
      <button 
            className="tableActionButtons btn-floating waves-effect waves-light btn  green lighten-1"
            onClick={handleOpen}>
        <i className="material-icons" onClick={toggleEdit}>edit</i>
      </button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
          >
          <div className="editTaskModal">
            <form className="modalEditForm" onSubmit={handleEdits}>
                <h1 className="modalEditHeader">Edit Task</h1>
                <div>Task Name</div>
                  <input
                  type="text"
                  // placeholder={chore}
                  placeholder="What Specifics?"
                  value={editedChore}
                  onChange={e => setEditedChore(e.target.value)}
                  />
                <div className="middleEditModal">
                  
                <div>
                  <div>Due Date</div>
                  <ExpansionPanel className="grey lighten-3 editModalRound">
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="pink accent-3 editModalRound"
                    >
                      <div className="modalButtonText">{date}</div>
                    </ExpansionPanelSummary>  
                          <ExpansionPanelDetails>
                            <div>
                            <input
                              type="date"
                              // className="datepicker"
                              placeholder={date}
                              value={editedDate}
                              onChange={e => setEditedDate(e.target.value)}
                              />
                        </div>
                      </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>

                <div>
                  <div>Assigned To:</div>
                  <ExpansionPanel className="grey lighten-3 editModalRound">
                      <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon/>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="pink accent-3 editModalRound"
                      >
                        <div className="modalButtonText modalRoundButton">
                            DropDown
                        </div>
                      </ExpansionPanelSummary>  
                        <ExpansionPanelDetails>
                          <div>
        {/* Here is the loop the get list of user in a group broken code Michael*/}
                {/* {user.map(group => (
                <ProfilePhotoTask/>
                  ))} */}
                            {/* <ProfilePhotoTask/> */}
                              <input
                                type="text"
                                placeholder={assigned}
                                value={editedAssigned}
                                onChange={e => setEditedAssigned(e.target.value)}
                                
                              />
                          </div>
                        </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>

                </div>
                  <div className="bottomModalButtons">
                    <div>
                    <button  type="submit" value="SUBMIT" className="threeButtonsOne waves-effect waves-light btn-large pink accent-3 hvr-shutter-out-vertical">submit</button>
                    </div>
                    <div>
                      <button className="threeButtonsOne waves-effect waves-light btn-large pink accent-3 hvr-shutter-out-vertical" onClick={() => setEditing(false)}>
                        <span onClick={handleClose}>CANCEL</span>
                      </button>
                      </div>
                  </div>
            </form>
          </div>
      </Modal>
</span>
  )
}
export default TaskModal;

/* <input
type="text"
placeholder="NOT COMPLETED"
value={editedIsDone}
onChange={e => setEditedIsDone(e.target.value)}
/> */
//           <div>
//             <AddComment taskId={task.id} groupId={groupId} />
//             <GetComments taskId={task.id} groupId={groupId} />
//           </div>
