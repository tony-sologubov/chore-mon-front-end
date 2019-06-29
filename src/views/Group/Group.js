import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Pic from "../../components/Pic";
import TaskTable from "./TaskTable";

const groupId = window.location.href.split("/").pop();
class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      members: [],
      name: ""
    };
  }

  componentDidMount() {
    console.log(groupId);
    axios
      .get(`https://chore-monkey.herokuapp.com/api/group/${groupId}`)
      .then(res => {
        this.setState({
          tasks: res.data.tasks,
          members: res.data.members,
          name: res.data.name
        });
      });
  }
  render() {
    const { name, members } = this.state;
    return (
      <div className="Dashboard">
        <h1>{name}</h1>
        <h2>Task List</h2>
        <TaskTable tasks={this.state.tasks} />
        <h2>Collaborators</h2>

        {members.map(m => {
          return <Pic key={m.id} photo={m.profilePicture} />;
        })}
        <Link to={`/groupsettings/${groupId}`}>
          <button className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical">
            <span className="iconLinks">Edit Group</span>
          </button>
        </Link>
      </div>
    );
  }
}

export default Group;
