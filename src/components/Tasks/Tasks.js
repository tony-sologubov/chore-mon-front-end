import React, { useEffect, useContext } from 'react'
import Task from './Task'
import axios from 'axios'
import uuidv4 from 'uuid'

export const Tasks = () => {
  const { state, dispatch } = useContext(TasksContext)
  const { tasks } = state
  useEffect(() => {
    async function getTasks() {
      const res = await axios.get(
        'https://chore-monkey.herokuapp.com/api/tasks'
      )
      dispatch({ type: 'GET_TASKS', payload: res.data.data })
    }
    getTasks()
  }, [dispatch])
  return (
    <div>
      {tasks.map(task => (
        <Task {...task} key={uuidv4()} />
      ))}
    </div>
  )
}
