import React from 'react'
import contentEditable from './contentEditable'

const CommentCard = ({ comment, displayName, taskId, groupId }) => {
  const Editable = contentEditable('div')
  return (
    <>
      <Editable
        value={comment}
        comment={comment}
        taskId={taskId}
        groupId={groupId}
      />
      <div>{displayName}</div>
    </>
  )
}

export default CommentCard
