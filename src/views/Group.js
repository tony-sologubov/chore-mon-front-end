import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import GetTasks from '../components/Tasks/GetTasks'

const Group = ({ match }) => {
  return (
    <>
      <Link to={`/groups/${match.params.groupName}/add-task`}>Add Task</Link>
      <GetTasks groupRoute={match.params.groupName} />
    </>
  )
}

export default withRouter(Group)
