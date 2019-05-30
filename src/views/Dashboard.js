import React from 'react'
import GetGroups from '../components/Groups/GetGroups.js'

function Dashboard({ history }) {
  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      <div className="welcome-text">
        <p>
          Welcome back
          {JSON.parse(localStorage.getItem('user')).displayName}
        </p>
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
      <GetGroups />
    </div>
  )
}

export default Dashboard
