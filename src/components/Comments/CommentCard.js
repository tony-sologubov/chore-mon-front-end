import React from 'react'
import contentEditable from './contentEditable'

const CommentCard = ({ comment, groupId, taskId, displayName }) => {
  const Editable = contentEditable('div')
  return (
    <>
      <Editable
        value={comment}
        groupId={groupId}
        taskId={taskId}
        comment={comment}
      />
      <div>{displayName}</div>
    </>
  )
}

export default CommentCard
