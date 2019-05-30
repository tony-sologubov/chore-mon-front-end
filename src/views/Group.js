import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import GetTasks from '../components/Tasks/GetTasks'

const Group = ({ location }) => {
  return (
    <>
      <Link to="/add-task">Add Task</Link>
      <GetTasks />
    </>
  )
}

export default withRouter(Group)
