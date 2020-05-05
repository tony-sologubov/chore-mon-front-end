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
      setAdmin: false
    };
  }

  componentDidMount() {
    this.fetchGroup();
  }

  fetchGroup = () => {
    const groupId = this.props.match.params.groupId;
    axios
      .get(`https://uffizzi-test.herokuapp.com/api/group/${groupId}`)
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
    const member = this.state.members.filter(member => member.uid == user.uid);

    this.setState({
      isAdmin: member[0].isAdmin,
      setAdmin: true
    });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  addTask = task => {
    axios
      .post("https://uffizzi-test.herokuapp.com/api/tasks", task)
      .then(res => {
        this.setState({ showModal: false });
        this.fetchGroup();
      })
      .catch(er => console.log(er.message));
  };

  editTask = (task, id) => {
    axios
      .put(`https://uffizzi-test.herokuapp.com/api/tasks/${id}`, task)
      .then(res => {
        console.log("Success");
        this.fetchGroup();
      })
      .catch(er => console.log(er.message));
  };

  render() {
    if (this.state.fetchedGroups && !this.state.setAdmin) {
      this.checkAdmin();
    }
    const { name, members } = this.state;

    const groupId = this.props.match.params.groupId;
    return (
      <div className="group-dash ">
        <header className="g-head">
          <h1>{name}</h1>
          <Link to={{ pathname: `/dashboard` }}>
            <button className="hvr-glow fun-button">Back To Dashboard</button>
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
              delete={this.delete}
              fg={this.fetchGroup}
            />
          </div>

          <div className="g-mid-right card">
            <h2>Collaborators</h2>

            <div className="collaborators">
              {members.map(m => {
                return <Pic key={m.id} photo={m.profilePicture} />;
              })}
            </div>
            <button className="fun-button hvr-glow" onClick={this.openModal}>
              add task
            </button>
          </div>
        </section>
        <div className="g-bot">
          {this.state.isAdmin && (
            <Link to={`/groupsettings/${groupId}`}>
              <button className="gsb fun-button hvr-glow">
                <i className="icon-settings chief" /> Chief Monkey Only!
              </button>
            </Link>
          )}
        </div>

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
      </div>
    );
  }
}

export default withRouter(Group);
