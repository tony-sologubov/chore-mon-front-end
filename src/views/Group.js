import React, { useState, useContext, useEffect, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GetTasks from '../components/Tasks/GetTasks';
import Modal from 'react-responsive-modal';
// import InviteGenerator from '../components/Invites/InviteGenerator'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfilePhotoTask from '../components/Tasks/TaskAvatar';

import ProfilePhoto from '../components/Groups/GroupAvatars';
import axios from 'axios';

const url = 'https://chore-monkey.herokuapp.com/api';
// const url = "http://localhost:9000/api";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      tasks: [],
      name: '',
      newName: '',
      title: '',
      assignedTo: '',
      dueDate: '',
      groupId: 0,
      taskModalOpen: false,
      isModalOpen: false
    };
  }

  componentDidMount() {
    const { groupId } = this.props.match.params;
    this.fetchGroup(groupId);
  }

  fetchGroup = groupId => {
    axios.get(`${url}/group/${groupId}`).then(group => {
      this.setState({
        members: group.data.members,
        tasks: group.data.tasks,
        name: group.data.name,
        title: '',
        assignedTo: '',
        dueDate: '',
        groupId: 0,
        taskModalOpen: false
      });
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitTask = e => {
    e.preventDefault();
    this.addTask();
  };

  submitNewGroupName = e => {
    e.preventDefault();
    this.editGroup();
  };

  addTask = () => {
    const newTask = {
      title: this.state.title,
      assignedTo: this.state.assignedTo.uid,
      dueDate: this.state.dueDate,
      groupId: this.props.match.params.groupId,
      listId: 1
    };

    axios
      .post(`${url}/tasks/`, newTask)
      .then(response => {
        this.fetchGroup(this.props.match.params.groupId);
      })
      .catch(err => {
        console.log('task error', err);
      });
  };

  deleteTask(taskId) {
    console.log('Delete Firing:', taskId);
    //  axios.delete(`http://localhost:9000/api/tasks/${taskId}`)
  }

  editGroup = () => {
    const newGroup = {
      name: this.state.newName
    };
    axios
      .put(`${url}/groups/${this.props.match.params.groupId}`, newGroup)
      .then(response => {
        console.log(response.data);
        this.fetchGroup(this.props.match.params.groupId);
      })
      .catch(err => {
        console.log('group not updating', err);
      });
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  openModal = () => {
    this.setState({ taskModalOpen: true });
  };

  closeModal = () => {
    this.setState({ taskModalOpen: false });
  };

  handleAssignClick(member) {
    this.setState({ assignedTo: member });
    console.log('Handled Assign Click');
    console.log(this.state);
    console.log(this.state.assignedTo);
    console.log(this.state.assignedTo.uid);
  }

  render() {
    const { groupId } = this.props.match.params;
    return (
      <div className="Dashboard">
        <div className="topHeaderAndButtons">
          <h1 className="groupsHeader">{this.state.name}</h1>
          <button
            className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical"
            onClick={() => this.setState({ isModalOpen: !this.state.isModalOpen })}
          >
            Edit List
          </button>

          <Modal open={this.state.isModalOpen} toggle={this.toggleModal}>
            <form onSubmit={this.submitNewGroupName}>
              <input
                type="text"
                name="newName"
                placeholder={this.state.name}
                onChange={event => this.handleChange(event)}
                value={this.state.newName}
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
            <button className="threeButtonsOne waves-effect waves-light btn-large pink accent-3 hvr-shutter-out-vertical">
              <span className="material-icons iconLinks iconOne">access_time</span>
              <span className="iconLinks" onClick={this.openModal}>
                NewTask
              </span>
            </button>
            <Modal
              open={this.state.taskModalOpen}
              onClose={this.closeModal}
              center
              showCloseIcon={false}
            >
              <div className="addTaskDiv">
                <h2 className="add-task-title">New Task</h2>
                <form onSubmit={this.submitTask} className="addTaskForm">
                  <input
                    type="text"
                    name="title"
                    placeholder="Add a Task"
                    value={this.state.title}
                    onChange={event => this.handleChange(event)}
                  />

                  <label htmlFor="date" className="dueDateText">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="dueDate"
                    placeholder="date"
                    value={this.state.dueDate}
                    onChange={event => this.handleChange(event)}
                  />
                  <div>
                    <div>Assigned To:</div>
                    <ExpansionPanel className="grey lighten-3 editModalRound">
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="pink accent-3 editModalRound"
                      >
                        <div className="modalButtonText"> People In The Group! </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div>
                          {this.state.members.map(member => (
                            <div>
                              <ProfilePhotoTask
                                key={member.userId}
                                user={member}
                                onClick={event => this.handleAssignClick(member)}
                              />
                            </div>
                          ))}
                          <h4 style={{ marginTop: '19px' }}>Assigned to </h4>
                          {/* <ProfilePhotoTask user={this.state.assignedTo}/> */}
                          <input value={this.state.assignedTo.name} />
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                  <button
                    type="submit"
                    value="submit"
                    className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical submit-button"
                    onClick={this.closeModal}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </Modal>
            <Link to={`/dashboard`}>
              <button className="threeButtonsOne waves-effect waves-light btn-large pink accent-3 hvr-shutter-out-vertical">
                <span className="material-icons iconLinks iconOne">dashboard</span>
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
              deleteTask={this.deleteTask}
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

export default Group;
