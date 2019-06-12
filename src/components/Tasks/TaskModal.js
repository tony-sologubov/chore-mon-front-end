import React, { useContext, useState } from 'react'
import FirebaseContext from '../../firebase/context'
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';

  const  TaskModal = ({ taskId, chore, assigned, date, isDone, groupId }) => {
    const { firebase, user } = useContext(FirebaseContext)
    const [editing, setEditing] = useState(false)
    const [editedChore, setEditedChore] = useState(chore)
    const [editedAssigned, setEditedAssigned] = useState(assigned)
    const [editedDate, setEditedDate] = useState(date)
    // const [editedIsDone, setEditedIsDone] = useState(isDone)
    const [open, setOpen] = React.useState(false);

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
    setEditing(true)
  }

  return (
    <span>
        <button 
            className="tableActionButtons btn-floating waves-effect waves-light btn  green lighten-1"
            onClick={handleOpen}>
            <i className="material-icons">edit</i>
        </button>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className="editTaskModal">
                <h1>Chore</h1>

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



                <input type="submit" value="SUBMIT" />
                
                <button onClick={() => setEditing(false)}>
                    <span onClick={handleClose}>CANCEL</span>
                </button>
            </form>

        </div>
      </Modal>
    </span>
  );
}
/* <input
type="text"
placeholder="NOT COMPLETED"
value={editedIsDone}
onChange={e => setEditedIsDone(e.target.value)}
/> */

export default TaskModal;