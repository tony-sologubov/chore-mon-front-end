import React, { useState, useContext, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import GetTasksByUser from '../components/Tasks/GetTasksByUser'

const MyTasks = ({ match }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return (
      <div>
        <h1> Wops! Seems like you need to log in</h1>
        <a href="http://localhost:3000/login" className="waves-effect waves-light dash-btn hoverable" > Login </a>
      </div>
    )
  } else {
    return (
      <>
      <div className="topHeaderAndButtons">
        <h1 className="groupsHeader">{user.displayName.match(
          /[^\s,.'"!?]+/
          )[0]}'s Chores</h1>
        <div className="imageButtons">

          <Link to={`/dashboard`}>
            <button className="threeButtonsOne waves-effect waves-light btn-large pink accent-3">
              <span className="material-icons iconLinks iconOne">
                dashboard
              </span>
              <span className="iconLinks">Dashboard</span>
            </button>
          </Link>

        </div>
      </div>

      <div className="bottomTableAndUsers">
        <div className="bottomLeftView">
          <GetTasksByUser groupId={match.params.groupId}  />
        </div>
        <div className="rightBottomView"></div>
      </div>
    </>
    )
  }
}

export default withRouter(MyTasks)
