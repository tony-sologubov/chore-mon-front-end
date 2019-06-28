import React, { useState, useContext, useEffect, Component } from "react";
import { Link, withRouter } from "react-router-dom";
import GetTasks from "../components/Tasks/GetTasks";
// import InviteGenerator from '../components/Invites/InviteGenerator'

import ProfilePhoto from "../components/Groups/GroupAvatars";

import Modal from "react-responsive-modal";
import axios from "axios";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},
      members: [],
      tasks: [],
      name: ""
    };
  }

  componentDidMount() {
    const {groupId} = this.props.match.params
    this.fetchGroup(groupId);
  }
  fetchGroup = (groupId) => {
    axios.get(`http://localhost:9000/api/group/${groupId}`)
    .then(group => {
      this.setState({
        group: group.data,
        members: group.data.members,
        tasks: group.data.tasks,
        name: group.data.name
      })
    })
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const {groupId} = this.props.match.params
    console.log("Group State:\n", this.state)
    return (
      <div className="Dashboard">
        <div className="topHeaderAndButtons">
          <h1 className="groupsHeader">{this.state.name}</h1>
          <button
            className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical"
            onClick={() =>
              this.setState({ isModalOpen: !this.state.isModalOpen })
            }
          >
            > Edit List
          </button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <form>
              <input
                type="text"
                placeholder={this.state.name}
                value="{editedName}"
              />

              <input
                className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical"
                type="submit"
                value="submit"
              />
            </form>
          </Modal>
          <Link to={`/dashboard`}>
            <button className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical">
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
            <GetTasks
            groupId={groupId}
            groupName={this.state.name}
            tasks={this.state.tasks}
            members={this.state.members}
            />
          </div>
          <div className="rightBottomView">
            <div>
              <h2 className="houseText">House Members</h2>
            </div>
            {/* Work on this for the Avatars, need to map the members */}
            <div className="membersCardsView">
              {this.state.members.map(member => (
                <div>
                  <div className="invitedMembers">
                    <ProfilePhoto profilePicture={member.profilePicture} />
                  </div>
                </div>
              ))}
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
    );
  }
}

export default withRouter(Group);
