import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../firebase/index'
import contentEditable from '../../utils/contentEditable'
import uuidv4 from 'uuid'

const Comments = ({ id, gid }) => {
  const Div = contentEditable('p')
  const [comment, setComment] = useState('')
  const { firebase, user } = useContext(FirebaseContext)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const unsubscribe = firebase.firestore
      .collection(`users/${user.uid}/groups/${gid}/tasks/`)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc =>
          setComments(Object.values(doc.data().comments))
        )
      )
    return () => {
      unsubscribe()
    }
  }, [firebase.firestore, gid, id, user.uid])

  function submitComment(e) {
    e.preventDefault()
    const commentsRef = firebase.firestore
      .collection(`users/${user.uid}/groups/${gid}/tasks`)
      .doc(id)
    commentsRef.update({
      comments: firebase.arr.arrayUnion(comment)
    })
  }

  return (
    <>
      <div>
        <form onSubmit={submitComment}>
          <input
            type="text"
            name="comment"
            placeholder="leave a comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
      <div>
        {comments.map(comment => (
          <div
            key={uuidv4()}
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <Div value={comment} id={id} comment={comment} gid={gid} />
              <p>by: {user.displayName}</p>
            </div>
            <div>
              <button
                style={{ width: 'fit-content' }}
                onClick={() => {
                  const commentsRef = firebase.firestore
                    .collection(`users/${user.uid}/groups/${gid}/tasks`)
                    .doc(id)
                  commentsRef.update({
                    comments: firebase.arr.arrayRemove(comment)
                  })
                }}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Comments
