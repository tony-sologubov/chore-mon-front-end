import React, { useState, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import GetTasks from '../components/Tasks/GetTasks'
import { FirebaseContext } from '../firebase'

const Group = ({ match }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { firebase } = useContext(FirebaseContext)
  const [groupName, setGroupName] = useState('')

  const groupRef = firebase.firestore
    .collection(`users/${user.uid}/groups`)
    .doc(match.params.groupId)

  groupRef.get().then(doc => setGroupName(doc.data().groupName))

  return (
    <>
      <h1>{groupName}</h1>
      <Link to={`/groups/${match.params.groupId}/add-task`}>
        <p>Add Task</p>
      </Link>
      <Link to="/dashboard">
        <p>Go Back</p>
      </Link>
      <GetTasks groupId={match.params.groupId} groupName={groupName} />
    </>
  )
}

export default withRouter(Group)
