import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import Pic from "../../components/Pic";
import TaskTable from "./TaskTable";
import Modal from "react-responsive-modal";
import TaskForm from "./TaskForm";

const user = JSON.parse(localStorage.getItem("user"));

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      members: [],
      name: "",
      showModal: false,
      open: false,
      isAdmin: "amigos",
      fetchedGroups: false,
      setAdmin: false,
    };
  }

  componentDidMount() {
    this.fetchGroup();
  }

  fetchGroup = () => {
    const groupId = window.location.href.split("/").pop();
    axios
      .get(`https://chore-monkey.herokuapp.com/api/group/${groupId}`)
      .then(res => {
        this.setState({
          tasks: res.data.tasks,
          members: res.data.members,
          name: res.data.name,
          fetchedGroups: true
        });
      });
  };

  checkAdmin = () => {
    const member =  this.state.members.filter(member => member.uid == user.uid)
    console.log(member)
    this.setState({
      isAdmin: member[0].isAdmin,
      setAdmin: true
    })
  }

  openModal = () => {
    this.setState({ showModal: true });
  };
  open = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  close = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  addTask = task => {
    console.log(task);
    axios
      .post("https://chore-monkey.herokuapp.com/api/tasks", task)
      .then(res => {
        console.log(res);
        this.setState({ showModal: false });
        this.fetchGroup();
      })
      .catch(er => console.log(er.message));
  };

  editTask = (task, id) => {
    console.log("Edit Task Firing:");
    console.log(task);
    axios
      .put(`https://chore-monkey.herokuapp.com/api/tasks/${id}`, task)
      .then(res => {
        console.log("Success");
        this.fetchGroup();
      })
      .catch(er => console.log(er.message));
  };

  deleteTask = id => {
    axios
      .delete(`https://chore-monkey.herokuapp.com/api/tasks/${id}`)
      .then(res => {
        this.fetchGroup();
      })
      .catch(er => console.log(er.message));
  };

  render() {
    console.log(user)
    console.log(this.state)
    if (this.state.fetchedGroups && !this.state.setAdmin) {
      this.checkAdmin()
    }
    const { name, members } = this.state;
    const groupId = window.location.href.split("/").pop();
    return (
      <div className="group-dash ">
        <header className="g-head">
          <h1>{name}</h1>
          <Link to={{ pathname: `/dashboard` }}>
            <button>Back To Dashboard</button>
          </Link>
        </header>

        <section className="g-mid">
          <div className="g-mid-left ">
            <TaskTable
              members={this.state.members}
              tasks={this.state.tasks}
              groupId={groupId}
              open={this.open}
              add={this.openModal}
              edit={this.editTask}
              titleSubmit={this.editTask}
            />
          </div>

          <div className="g-mid-right card">
            <h2>Collaborators</h2>

            <div className="collaborators">
              {members.map(m => {
                return <Pic key={m.id} photo={m.profilePicture} />;
              })}
            </div>
            <button onClick={this.openModal}>add task</button>
          </div>
        </section>

        <Modal id="d" open={this.state.open} onClose={this.close}>
          Delete Selected Tasks?
          <button>yeah</button>
        </Modal>

        <Modal
          open={this.state.showModal}
          onClose={this.closeModal}
          contentLabel="Add Task"
        >
          <TaskForm
            delete={this.deleteTask}
            groupId={groupId}
            members={this.state.members}
            addTask={this.addTask}
            openModal={this.openModal}
          />
        </Modal>

{ this.state.isAdmin &&  (
        <Link to={`/groupsettings/${groupId}`}>
          <button className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical">
            <span className="iconLinks">Edit Group</span>
          </button>
        </Link> )}
      </div>
    );
  }
}

export default withRouter(Group);
