import React, { useState, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import GetTasks from '../components/Tasks/GetTasks'
import InviteGenerator from '../components/Invites/InviteGenerator'
import SCHEDULE from '../assets/group-page/png/SCHEDULE.png'
import SCHEDULE1 from '../assets/group-page/png/SCHEDULE-1.png'
import SCHEDULE2 from '../assets/group-page/png/SCHEDULE-2.png'
import IMAGE1 from '../assets/group-page/png/IMAGE.png'
import IMAGE2 from '../assets/group-page/png/IMAGE-1.png'
import IMAGE3 from '../assets/group-page/png/IMAGE-2.png'
import IMAGE4 from '../assets/group-page/png/IMAGE-3.png'
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
    <div className="topHeaderAndButtons">
      <h1 className="groupsHeader">
        Daily Chores
      </h1>
        <div className="imageButtons">

            <Link to={`/groups/${match.params.groupId}/add-task`}>
              <button className="threeButtonsOne waves-effect waves-light btn-large pink accent-3 ">
                <span className="material-icons iconLinks iconOne">access_time</span>
                <span className='iconLinks'>NewTask</span>
              </button>
            </Link>

            <Link to={`/dashboard`}>
              <button className="threeButtonsOne waves-effect waves-light btn-large pink accent-3">
                <span className="material-icons iconLinks iconOne">dashboard</span>
                <span className="iconLinks">Dashboard</span>
              </button>
            </Link>

          <Link>
            <button className="threeButtonsOne waves-effect waves-light btn-large pink accent-3">
              <span className="material-icons iconLinks iconOne">format_list_bulleted</span>
              <span className="iconLinks">My Chores</span>
            </button>
          </Link>
        </div>
      </div>

    <div className="bottomTableAndUsers">
      <div className="bottomLeftView">
        {/* <GetTasks groupRoute={match.params.groupName} /> */}
        <GetTasks groupId={match.params.groupId} groupName={groupName} />
      </div>
      <div className="rightBottomView">

        <div>
          <h2 className="houseText">House Members</h2>
        </div>

          <div className="membersCardsView">
            <div>
              <div className="invitedMembers"><img src={IMAGE1} alt="a users profile">
              </img></div>
              <div className="invitedMembers"><img src={IMAGE2} alt="a users profile">
              </img></div>
            </div>
            <div>
              <div className="invitedMembers"><img src={IMAGE3} alt="a users profile">
              </img></div>
              <div className="invitedMembers"><img src={IMAGE4} alt="a users profile">
              </img></div>
            </div>
          </div>

        <div className="buttomInviteButton">
          <span>
            <button className="waves-effect waves-light btn-large pink accent-3">Invite Member</button>
          </span>
        </div>

      </div>

    </div>
      {/* <h1>{groupName}</h1>
      <Link to={`/groups/${match.params.groupId}/add-task`}>
        <p>Add Task</p>
      </Link>
      <Link to="/dashboard">
        <p>Go Back</p>
      </Link>
      <GetTasks groupId={match.params.groupId} groupName={groupName} /> */}
    </>
  )
}

export default withRouter(Group)
