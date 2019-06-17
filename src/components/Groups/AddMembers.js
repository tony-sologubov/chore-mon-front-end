import React, { useContext, useEffect } from 'react'
import useFormValidation from '../Auth/useFormValidation'
import FirebaseContext from '../../firebase/context'
import '../../styles/addgroups.css'

const initialState = {
  email: ''
}

function validateMember(values) {
  let errors = {}
  if (!values.email) {
    errors. = 'member email is required.'
  }
  return errors
}

export default function AddMember({ history }) {
  const { firebase, user } = useContext(FirebaseContext)
  const { handleSubmit, handleChange, errors, values } = useFormValidation(
    initialState,
    validateMember,
    submitMember
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

  async function submitMember() {
    try {
      const docRef = firebase.firestore
        .collection(`users/${user.uid}/groups/${group.gid}`)
        .doc()
      await docRef.set({ email: values.email, memberId: docRef.id })
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
        name="email"
        placeholder="Add a member"
        value={values.email}
        onChange={event => handleChange(event)}
      />
      <button type="submit" 
      value="submit" 
      className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical">
      Submit
      </button>
      {errors.email && <p>{errors.email}</p>}
    </form>
    </div>
    </div>
  )
}
