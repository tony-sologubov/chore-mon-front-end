import React, { useContext, useReducer } from 'react'
import useFormValidation from '../Auth/useFormValidation'
import FirebaseContext from '../../firebase/context'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfilePhotoTask from './TaskAvatar'
// import Modal from '@material-ui/core/Modal';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

const initialState = {
  chore: '',
  assigned: '',
  date: '',
  isDone: 'NOT COMPLETED'
}

function validateTask(values) {
  let errors = {}
  if (!values.chore || !values.assigned || !values.date) {
    errors.values =
      'You are missing required items.  Please complete all fields and then resubmit.'
  }
  return errors
}

export default function AddTask({ history, match }) {
  // const [open, setOpen] = React.useState(false);
  const { firebase, user } = useContext(FirebaseContext)
  const { handleSubmit, handleChange, errors, values } = useFormValidation(
    initialState,
    validateTask,
    submitTask
  )
    // const [anchorEl, setAnchorEl] = React.useState(null);
  
    // function handleClick(event) {
    //   setAnchorEl(event.currentTarget);
    // }
  
    // function handleClose() {
    //   setAnchorEl(null);
    // }


  async function submitTask() {
    try {
      await firebase.firestore
        .collection(`users/${user.uid}/groups/${match.params.groupId}/tasks`)
        .doc()
        .set({
          chore: values.chore,
          assigned: values.assigned,
          date: values.date,
          isDone: false,
          comments: []
        })
    } catch (err) {
      console.error({ error: err.message })
    } finally {
      history.push(`/groups/${match.params.groupId}`)
    }
  }

  return (
    <div className="taskBackGround">
<div className="addTaskDiv">
    <h2>New Task</h2>
    <form onSubmit={handleSubmit} className="addTaskForm">
      <input
        type="text"
        name="chore"
        placeholder="Add a Task"
        value={values.chore}
        onChange={event => handleChange(event)}
      />

      <label htmlFor="date" className="dueDateText">Due Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        placeholder="date"
        value={values.date}
        onChange={event => handleChange(event)}
      />


          {/* <input
            type="text"
            name="assigned"
            placeholder="Assign a Person"
            value={values.assigned}
            onChange={event => handleChange(event)}
          /> */}
          <div>
    <div>Assigned To:</div>
    <ExpansionPanel className="grey lighten-3 editModalRound">
          <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="pink accent-3 editModalRound"
          >
              <div className="modalButtonText">
                  People In The Group!
              </div>
          </ExpansionPanelSummary>  
          <ExpansionPanelDetails>
              <div>
        {/* Here is the loop the get list of user in a group broken code Michael*/}
                {/* {user.map(group => (
                <ProfilePhotoTask/>
                  ))} */}
                  <ProfilePhotoTask/>

                <input
                type="text"
                name="assigned"
                placeholder="Assign a Person"
                value={values.assigned}
                onChange={event => handleChange(event)}
              />
              </div>
          </ExpansionPanelDetails>
    </ExpansionPanel>
</div>
      <button 
      type="submit" 
      value="submit" 
      className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical">
        {/* <input type="submit" value="submit" /> */}
        Submit
        </button>
        {errors.values && <p>{errors.values}</p>}
      </form>
    </div>
  </div>
  )
}
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

//  <div>
//     <div>Assigned To:</div>
//     <ExpansionPanel className="grey lighten-3 editModalRound">
//           <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon/>}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//           className="pink accent-3 editModalRound"
//           >
//               <div className="modalButtonText">
//                   DropDown
//               </div>
//           </ExpansionPanelSummary>  
//           <ExpansionPanelDetails>
//               <div>
//                 <ProfilePhotoTask/>
//                 <input
//                 type="text"
//                 name="assigned"
//                 placeholder="Assign a Person"
//                 value={values.assigned}
//                 onChange={event => handleChange(event)}
//               />
//               </div>
//           </ExpansionPanelDetails>
//     </ExpansionPanel>
// </div> 