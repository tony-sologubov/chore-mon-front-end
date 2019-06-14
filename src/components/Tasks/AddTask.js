import React, { useContext } from 'react'
import useFormValidation from '../Auth/useFormValidation'
import FirebaseContext from '../../firebase/context'
// import Modal from '@material-ui/core/Modal';

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
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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

      <input
        type="text"
        name="assigned"
        placeholder="Assign a Person"
        value={values.assigned}
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
      <button 
      type="submit" 
      value="submit" 
      className="waves-effect waves-light btn-large pink accent-3">
        {/* <input type="submit" value="submit" /> */}
        Submit
        </button>
        {errors.values && <p>{errors.values}</p>}
      </form>
    </div>
  </div>
  )
}
