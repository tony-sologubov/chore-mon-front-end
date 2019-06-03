import React, { useContext, useState } from 'react'
import FirebaseContext from '../firebase/context'

function contentEditable(WrappedComponent) {
  return function(props) {
    const { firebase, user } = useContext(FirebaseContext)
    const [editing, setEditing] = useState(false)

    const toggleEdit = e => {
      e.stopPropagation()
      if (editing) {
        cancel()
      } else {
        edit()
      }
    }

    const edit = () => {
      setEditing(true)
      return () => {
        domElm.focus()
      }
    }

    const save = () => {
      setEditing(false)
    }

    const cancel = () => setEditing(false)

    const isValueChanged = () => {
      if (props.value !== domElm.textContent) {
        save()
        const docRef = firebase.firestore
          .collection(`users/${user.uid}/groups/${props.gid}/tasks`)
          .doc(props.id)
        docRef.update({ comments: firebase.arr.arrayUnion(domElm.textContent) })
        docRef.update({ comments: firebase.arr.arrayRemove(props.comment) })
      }
    }

    const handleKeyDown = e => {
      const { key } = e
      switch (key) {
        case 'Enter':
          isValueChanged()
          break
        case 'Escape':
          save()
          break
        default:
          break
      }
    }

    let editOnClick = true
    let domElm = null
    if (props.editOnClick !== undefined) {
      editOnClick = props.editOnClick
    }
    return (
      <WrappedComponent
        className={editing ? 'editing' : ''}
        onClick={editOnClick ? toggleEdit : undefined}
        contentEditable={editing}
        ref={domNode => {
          domElm = domNode
        }}
        onBlur={save}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {props.value}
      </WrappedComponent>
    )
  }
}

export default contentEditable
