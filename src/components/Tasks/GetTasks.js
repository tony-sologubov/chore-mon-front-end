import React, { Component, Fragment } from 'react'
import uuidv4 from 'uuid'
import FirebaseContext from '../../firebase/context'
import TaskCard from './TaskCard'
import axios from 'axios'

let tasks = [];

class GetTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  // componentDidMount() {
  //   this.fetchTasks();
  // }

  // fetchTasks = () => {
  //   console.log("FIRED")
  //   console.log(this.props)
  //   axios.get(`http://localhost:9000/api/tasks/group/${this.props.groupId}`)
  //   .then(tasks =>{ this.setState({tasks:  tasks.data.data}) })
  // }
  render () {

    console.log("Props:", this.props)
    console.log("Tasks:", this.props.tasks)
    return (
      <div className="groupTableList">
        <table className="highlight">
          <thead>
            <tr>
              <th className="boldTable">Done</th>
              <th className="boldTable">Chore</th>
              <th className="boldTable">Assigned</th>
              <th className="boldTable">Date</th>
              <th className="boldTable">Actions</th>
            </tr>

            {this.props.tasks.map(task => (
              <Fragment key={uuidv4()}>
                <TaskCard
                  taskId={task.id}
                  title={"task.title"}
                  dueDate={task.dueDate}
                  isComplete={task.isComplete}
                  assignedTo={task.assignedTo}
                  groupId={tasks.groupId}
                  members={this.props.members}
                />
              </Fragment>
            ))}
          </thead>
        </table>
      </div>
    )
  }
}

export default GetTasks
