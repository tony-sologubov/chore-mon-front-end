import React, { useContext } from 'react'
import useFormValidation from '../Auth/useFormValidation'
import FirebaseContext from '../../firebase/context'

const initialState = {
  groupName: ''
}

function validateGroup(values) {
  let errors = {}
  if (!values.groupName) {
    errors.groupName = 'Group name is required'
  }
  return errors
}

export default function AddGroup({ history }) {
  const { firebase } = useContext(FirebaseContext)
  const { handleSubmit, handleChange, errors, values } = useFormValidation(
    initialState,
    validateGroup,
    submitGroup
  )
  async function submitGroup() {
    try {
      await firebase.dbFS
        .collection('groups')
        .doc()
        .set({ groupName: values.groupName })
    } catch (err) {
      console.error({ error: err.message })
    } finally {
      history.push('/dashboard')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="groupName"
        placeholder="add a group name"
        value={values.groupName}
        onChange={event => handleChange(event)}
      />
      <button type="submit">Submit</button>
      {errors.groupName && <p>{errors.groupName}</p>}
    </form>
  )
}
