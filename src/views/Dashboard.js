import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../firebase/index'
import RenderGroups from '../components/Groups/RenderGroups.js'

function Dashboard({ history }) {
  const [groupList, setGroupList] = useState(null)
  const { firebase, user } = useContext(FirebaseContext)
  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      <div className="welcome-text">
        <p> Welcome back, {user.displayName}</p>
      </div>
      <button
        onClick={() => {
          history.push('/add-group')
        }}
        className="waves-effect waves-light btn-large"
      >
        New Group
      </button>
      <h2>My Family Groups</h2>
      <RenderGroups />
    </div>
  )
}

export default Dashboard
