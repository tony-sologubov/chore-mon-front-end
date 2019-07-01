import React, { Component } from "react";
import TinyPic from "../../components/TinyPic";

class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
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
                <td>Actions</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default TaskTable;
