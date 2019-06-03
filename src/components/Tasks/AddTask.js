import React, { useContext } from 'react'
import useFormValidation from '../Auth/useFormValidation'
import FirebaseContext from '../../firebase/context'

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
  const { firebase, user } = useContext(FirebaseContext)
  const { handleSubmit, handleChange, errors, values } = useFormValidation(
    initialState,
    validateTask,
    submitTask
  )

  async function submitTask() {
    const id = match.params.id
    try {
      await firebase.firestore
        .collection(`users/${user.uid}/groups/${id}/tasks`)
        .doc()
        .set({
          chore: values.chore,
          assigned: values.assigned,
          date: values.date,
          isDone: 'NOT COMPLETED',
          comments: []
        })
    } catch (err) {
      console.error({ error: err.message })
    } finally {
      history.push(`/groups/${id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="chore"
        placeholder="add a chore"
        value={values.chore}
        onChange={event => handleChange(event)}
      />

      <input
        type="text"
        name="assigned"
        placeholder="add a assigned person"
        value={values.assigned}
        onChange={event => handleChange(event)}
      />
      <label htmlFor="date">Due Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        placeholder="date"
        value={values.date}
        onChange={event => handleChange(event)}
      />

      <input type="submit" value="submit" />
      {errors.values && <p>{errors.values}</p>}
    </form>
  )
}
