import React, { Component } from "react";
import TinyPic from "../../components/TinyPic";
import EditableLabel from "react-inline-editing";
class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      editing: false,
      editTaskId: "",
      assignedTo: ""
    };
  }

  find = id => {
    const mem = this.props.members.filter(m => m.uid === id);
    if (mem[0]) {
      return mem[0].profilePicture;
    } else {
      return "no asignee";
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  edit = (task) => {
    if (!this.state.editTaskId) {
      return this.setState({ editing: !this.state.editing, editTaskId: task.id, assignedTo: task.assignedTo });
    } else {
      return this.setState({ editing: !this.state.editing, editTaskId: "", title: "" });
    }
  };

  submit = (e) => {
    e.preventDefault();
    console.log("We Update here!")
    console.log(this.props)
    console.log(this.props.groupId)
    this.props.edit({
      assignedTo: this.state.assignedTo,
      title: this.state.title,
      groupId: this.props.groupId,
    }, this.state.editTaskId)
    return this.setState({ editing: !this.state.editing, editTaskId: "" });
  };

  render() {
    console.log("State")
    console.log(this.state)
    return (
      <div>
        <table className="pink striped highlight responsive-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Assigned To: </th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.props.tasks.map(t => {
              const date = new Date(t.dueDate).toLocaleDateString("en-US");
              const photo = this.find(t.assignedTo);
              return (
                <tr>
                  <td>{t.title}</td>
                  <td>
                    <TinyPic photo={photo} />
                  </td>
                  <td>{date}</td>
                  <td>
                    <button onClick={() => this.edit(t)}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.editing && (
          <form onSubmit={(e) => this.submit(e)}>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </form>
        )}
      </div>
    );
  }
}

export default TaskTable;
