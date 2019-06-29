import React, { Component } from "react";
import MaterialTable from "@material-ui/core/Table";

class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Task",
          field: "title",
          options: {
            filter: true,
            sort: true
          }
        },
        {
          title: "Assigned To",
          field: "assignedTo",
          options: {
            filter: true,
            sort: true
          }
        },
        {
          title: "Due Date",
          field: "dueDate",
          type: "numeric",
          options: {
            filter: true,
            sort: true
          }
        },
        {
          title: "Complete",
          field: "isComplete",
          options: {
            filter: true,
            sort: true
          }
        }
      ],
      data: []
    };
  }

  componentDidMount() {
    this.get();
  }

  get() {
    this.setState({
      data: this.props.tasks
    });
  }
  render() {
    return (
      <MaterialTable
        title="Task List"
        columns={this.state.columns}
        data={this.state.data}
      />
    );
  }
}

export default TaskTable;

// editable={{
//     onRowAdd: newData =>
//       new Promise(resolve => {
//         setTimeout(() => {
//           resolve();
//           this.props.addTask()
//           this.get()
//         }, 600);
//       }),
//     onRowUpdate: (newData, oldData) =>
//       new Promise(resolve => {
//         setTimeout(() => {
//           resolve();
//           const data = [...state.data];
//           data[data.indexOf(oldData)] = newData;
//           setState({ ...state, data });
//         }, 600);
//       }),
//     onRowDelete: oldData =>
//       new Promise(resolve => {
//         setTimeout(() => {
//           resolve();
//           const data = [...state.data];
//           data.splice(data.indexOf(oldData), 1);
//           setState({ ...state, data });
//         }, 600);
//       }),
//   }}
