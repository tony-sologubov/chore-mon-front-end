import React, { useContext } from 'react'
import { FirebaseContext } from '../firebase/index'

function Dashboard() {
  const { firebase, user } = useContext(FirebaseContext)
  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      <div className="welcome-text">
        <p> Welcome back, {user.displayName}</p>
      </div>
      <button className="waves-effect waves-light btn-large">New Group</button>
      <h2>My Family Groups</h2>
    </div>
  )
}

export default Dashboard
