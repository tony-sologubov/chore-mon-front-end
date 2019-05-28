import React, { useContext, useState } from 'react'
import TasksContext from './context'
import moment from 'moment'

const AddTask = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { dispatch } = useContext(TasksContext)

  const handleSubmit = async e => {
    e.preventDefault()
    const task = {
      title,
      description,
      isComplete: false,
      createdAt: moment().format()
    }

    dispatch({ type: 'ADD_TASK', payload: task })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input type="submit" value="submit" />
    </form>
  )
}

export default AddTask
