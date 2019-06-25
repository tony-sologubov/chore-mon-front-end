import React, { useState, useContext, useEffect, Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import GetTasks from '../components/Tasks/GetTasks'
import InviteGenerator from '../components/Invites/InviteGenerator'
import { FirebaseContext } from '../firebase'
import ProfilePhoto from '../components/Groups/GroupAvatars'
// import IMAGE1 from '../assets/group-page/png/IMAGE.png'
import IMAGE2 from '../assets/group-page/png/IMAGE-1.png'
import IMAGE3 from '../assets/group-page/png/IMAGE-2.png'
import IMAGE4 from '../assets/group-page/png/IMAGE-3.png'
// import Modal from '@material-ui/core/Modal';
// import Date from '../components/Tasks/Date'
import Modal from 'react-modal'
import axios from 'axios'

const usersUrl = "http://localhost:9000/api/users/"
const groupMembersUrl = "http://localhost:9000/api/groupmembers/"
var group = {}

class Group extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      tasks: [],
      members: [],
      isModalOpen: false
    };
  }

  componentDidMount() {
    this.fetchMembers();
    console.log(this.props) 
    console.log(this.props.location) 
    console.log(this.props.location.state) 
    console.log(this.props.location.state.group) 
    console.log(this.props.location.state.group.group) 
    // console.log(this.props.state.groups)
    // console.log(this.props.state.groups.groups)
  }
//   const user = JSON.parse(localStorage.getItem('user'))
//   const { firebase } = useContext(FirebaseContext)
//   const [groupName, setGroupName] = useState('')
//   const [editedName, setEditedName] = useState('')
//   const [editing, setEditing] = useState(false)
  // const [isModalOpen, toggleModal] = useState(false);
//   // const [selectedDate, handleDateChange] = useState(new Date());
// // console.log(firebase)

// console.log( props.location.state )
// console.log( props.location.state.group )
// console.log( props.location.state.group.group )

fetchMembers = () => {
  console.log(group)
  console.log("RUNNING")
  axios
  .get(`${groupMembersUrl}/group/${group.id}`)
  .then(groupMems => groupMems.data.forEach(data =>
    axios
    .get(`${usersUrl}/${data.userId}`)
    .then(user => this.setState({ members: [...this.state.members, user.data.data[0]]}))
    // console.log(data)
    ))
  }
  
  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen})
  }
// const group = firebase.firestore.collection('groups').doc(props.match.params.groupId)

//   const groupRef = firebase.firestore
//     .collection(`users/${user.uid}/groups`)
//     .doc(props.match.params.groupId)

//   useEffect(() => {
//     groupRef.get().then(doc => setGroupName(doc.data().groupName))
//   }, [groupName, groupRef])

//   async function deleteGroup() {
//     try {
//       await firebase.firestore
//         .collection(`users/${user.uid}/groups`)
//         .doc(group.id)
//         .delete()
//     } catch (err) {
//       console.log({ message: err.message, code: err.code })
//     }
//   }

//   async function handleEditedNameSubmit(e) {
//     firebase.firestore
//       .collection(`users/${user.uid}/groups`)
//       .doc(group.id)
//       .update({ groupName: editedName })
//   }

//   function toggleEdit() {
//     setEditing(true)
//   }



  render () {
    console.log("State:", this.state)
    group = this.props.location.state.group.group
    console.log("Group:", group)
    return (
      <div className="Dashboard">
      <div className="topHeaderAndButtons">
        <h1 className="groupsHeader">{group.name}</h1>
          <button 
          className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical" 
          onClick={() => this.setState({isModalOpen: !this.state.isModalOpen})}>
          >
          Edit List
          </button>
            <Modal 
            isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <form>
      <input
      
        type="text"
        placeholder={group.name}
        value="{editedName}"
        // onChange={e => setEditedName(e.target.value)}
      />

      <input 
      className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical" 
      type="submit" 
      value="submit" 
      // onClick={() => { toggleModal(false); handleEditedNameSubmit()}}
      />

    </form>

      </Modal>
          <Link to={`/dashboard`}>
            <button 
            className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical" 
            // onClick={deleteGroup}>
            >
              <span className="iconLinks">Delete List</span>
            </button>
          </Link>
        <div className="imageButtons">
          <Link to={`/groups/${4}/add-task`}>
            <button className="threeButtonsOne waves-effect waves-light btn-large pink accent-3 hvr-shutter-out-vertical">
              <span className="material-icons iconLinks iconOne">
                access_time
              </span>
              <span className="iconLinks">NewTask</span>
            </button>
          </Link>

          <Link to={`/dashboard`}>
            <button className="threeButtonsOne waves-effect waves-light btn-large pink accent-3 hvr-shutter-out-vertical">
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
        <GetTasks groupId={4} groupName={group.name} />
      </div>
      <div className="rightBottomView">

        <div>
          <h2 className="houseText">House Members</h2>
        </div>
{/* Work on this for the Avatars, need to map the members */}
          <div className="membersCardsView">
            {this.state.members.map(member =>
            <div>
              <div className="invitedMembers">
                <ProfilePhoto profilePicture={member.profilePicture}/>
              </div>
            </div>
            )}
          </div>

          <div className="buttomInviteButton">
            <span>
              {/* <button className="waves-effect waves-light btn-large pink accent-3">Invite Member</button> */}
              {/* <InviteGenerator
                groupId={4}
                userId={user.uid}
                /> */}
            </span>
          </div>
        

{/* <Date/> */}
         
        </div>
      </div>

    
    </div>
  )
}
}

export default withRouter(Group)
