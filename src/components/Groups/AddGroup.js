import React, { useContext, useEffect } from 'react'
import useFormValidation from '../Auth/useFormValidation'
import FirebaseContext from '../../firebase/context'

const initialState = {
  groupName: ''
}

function validateGroup(values) {
  let errors = {}
  if (!values.groupName) {
    errors.groupName = 'Group name is required.'
  }
  return errors
}

export default function AddGroup({ history }) {
  const { firebase, user } = useContext(FirebaseContext)
  const { handleSubmit, handleChange, errors, values } = useFormValidation(
    initialState,
    validateGroup,
    submitGroup
  )

  useEffect(() => {
    async function setUser() {
      await firebase.firestore
        .collection('users')
        .doc(`${user.uid}`)
        .set({ id: user.uid })
    }
    setUser()
  }, [firebase.firestore, user.uid])

  async function submitGroup() {
    try {
      const docRef = firebase.firestore
        .collection(`users/${user.uid}/groups`)
        .doc()
      await docRef.set({ groupName: values.groupName, id: docRef.id })
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
