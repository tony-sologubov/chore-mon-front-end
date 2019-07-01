import React, { Component } from "react";
import TinyPic from "../../components/TinyPic";
import EditableLabel from "react-inline-editing";
class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      editing: false
    };
  }

  find = id => {
    const mem = this.props.members.filter(m => m.uid === id);
    console.log(mem);
    if (mem[0]) {
      return mem[0].profilePicture;
    } else {
      return "no asignee";
    }
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  edit = () => {
    return this.setState({ editing: !this.state.editing });
  };

  submit = () => {};

  render() {
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
                    <button onClick={this.edit}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.editing && (
          <form onSubmit={this.props.edit}>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </form>
        )}
      </div>
    );
  }
}

export default TaskTable;
