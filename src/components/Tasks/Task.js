import React, { useContext } from 'react'
import moment from 'moment'
import axios from 'axios'
import contentEditable from './EditTask'

const Task = ({ title, createdAt, isComplete, description, id }) => {
  const EditP = contentEditable('p')
  const { dispatch } = useContext(TasksContext)
  return (
    <div>
      <EditP value={title} />
      <p>{moment().calendar(createdAt)}</p>
      <EditP value={description} />
      <p>{isComplete ? `COMPLETE` : `NOT DONE`}</p>
      <button
        onClick={async () => {
          try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`)
            dispatch({ type: 'DELETE_TASK', id })
          } catch (error) {
            dispatch({ type: 'DELETE_TASK', id })
          }
        }}
      >
        DELETE
      </button>
    </div>
  )
}

export default Task
