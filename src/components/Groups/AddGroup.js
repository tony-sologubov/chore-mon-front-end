import React, { useContext, useEffect } from 'react'
import useFormValidation from '../Auth/useFormValidation'
import FirebaseContext from '../../firebase/context'
import '../../styles/addgroups.css'

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
      await docRef.set({ groupName: values.groupName, groupId: docRef.id })
    } catch (err) {
      console.error({ error: err.message })
    } finally {
      history.push('/dashboard')
    }
  }
  return (
    <div className="groupBackGround">
<div className="addGroupDiv">
    <h2>New Group</h2>
    <form onSubmit={handleSubmit} className="addGroupForm">
      <input
        type="text"
        name="groupName"
        placeholder="Add a Group"
        value={values.groupName}
        onChange={event => handleChange(event)}
      />
      <button type="submit" 
      value="submit" 
      className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical">
      Submit
      </button>
      {errors.groupName && <p>{errors.groupName}</p>}
    </form>
    </div>
    </div>
  )
}
