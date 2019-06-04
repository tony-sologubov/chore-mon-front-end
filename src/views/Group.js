import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import GetTasks from '../components/Tasks/GetTasks'

const Group = ({ match }) => {
  return (
    <>
      <Link to={`/groups/${match.params.id}/add-task`}>Add Task</Link>
      <GetTasks gid={match.params.id} />
    </>
  )
}

export default withRouter(Group)
