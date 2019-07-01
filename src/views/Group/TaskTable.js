import React, { Component } from "react";

class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  find = id => {
    const mem = this.props.members.filter(m => m.uid === id);
    console.log(mem);
    if (mem[0]) {
      return mem[0].name;
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
            return (
              <tr>
                <td>{t.title}</td>
                <td>{this.find(t.assignedTo)}</td>
                <td>{t.dueDate}</td>
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
