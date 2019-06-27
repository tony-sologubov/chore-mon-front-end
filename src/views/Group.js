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
      isModalOpen: false
    };
  }

  componentDidMount() {
    const {groupId} = this.props.match.params
    this.props.fetchMembers(groupId);
    this.props.setCurrentGroup(groupId)
  }



  // deleteGroup = () => {
  //   console.log('DELETING')
  //   axios
  //   .delete(`http://localhost:9000/api/group/${group.id}`)
  //   .then(response => {
  //     this.setState({ group: response.data })
  //   })
  //   .catch(err => {console.log(err)})

  //   axios
  //   .get(`${groupMembersUrl}group/${group.id}`)
  //   .then(groupMemberships => {
  //     console.log(groupMemberships)
  //     groupMemberships.data.forEach(entry => {
  //       axios
  //       .delete(`${groupMembersUrl}remove/${entry.id}`)
  //       .then(response => {
  //         console.log(response)
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })

  //     })
  //   })
  // }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen})
  }



  render () {
    // console.log("State:", this.state)
    const { match } = this.props;

    console.log("match")
    console.log(match)
    console.log(this.props)
    // console.log(this.props.location)
    if (this.props.location.state.group) {
      group = this.props.location.state.group.group || match.params.groupId

    }
    // console.log("Group:", group)
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
             onClick={this.props.deleteGroup}>
            DELETE
              <span className="iconLinks">Delete List</span>
            </button>
          </Link>
        <div className="imageButtons">
          <Link to={ {pathname: `/groups/${group.id}/add-task`, state: { groupId: "group.id" }} }>
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
            {this.props.members.map(member =>
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
