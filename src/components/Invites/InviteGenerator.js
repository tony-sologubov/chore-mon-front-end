import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../firebase/index'

export default function InviteGenerator({ groupId, userId, history }) {
  const [email, setEmail] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const { firebase } = useContext(FirebaseContext)

  const toggleForm = () => {
    setShowForm(prevState => !prevState)
    setError(null)
    setSuccess(null)
  }

  const sendInvite = async e => {
    e.preventDefault()
    try {
      await firebase.sendEmailInvite(email, groupId, userId)
      setSuccess('The invite has been sent.')
      window.localStorage.setItem('emailForSignIn', JSON.stringify(email))
    } catch (err) {
      setError('Please enter a valid email address.')
      console.log({ code: err.code, msg: err.message })
    }
  }

  return !showForm ? (
    <button
      className="waves-effect waves-light btn-large pink accent-3 invite"
      onClick={toggleForm}
    >
      Invite
    </button>
  ) : (
    <form>
      <input
        type="email"
        placeholder="Enter the email for the user you wish to invite"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <button
        className="waves-effect waves-light btn-large pink accent-3 send"
        type="submit"
        onClick={sendInvite}
      >
        Send
      </button>

      <button
        className="waves-effect waves-light btn-large pink accent-3 cancel"
        onClick={toggleForm}
      >
        Cancel
      </button>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </form>
  )
}
