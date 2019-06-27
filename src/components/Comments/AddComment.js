import React, { useState, useContext } from 'react'
import FirebaseContext from '../../firebase/context'
import logic from './logic'

export default function AddComment({ groupId, taskId }) {
  const [comment, setComment] = useState('')
  const { user } = useContext(FirebaseContext)

  return (
    <form onSubmit={e => logic.add(e, user, groupId, taskId, comment)}>
      <input
        type="text"
        name="comment"
        placeholder="leave a comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <input type="submit" value="submit" />
    </form>
  )
}
