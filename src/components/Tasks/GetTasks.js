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


  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
      console.log("FIRED")
        axios.get('http://localhost:9000/api/tasks/group/3')
        .then(tasks =>{ this.setState({tasks:  tasks.data.data}) })
  }
    //     { 
    //       users.data.forEach(user => {
    //         if (user.uid == fbUser.uid) {
    //           this.setState({ user: user })
    //         }
    //       })
    //     })
    //   }
    // }

  // let tasks = fetchTasks()
  render () {

    // console.log("PRops:", this.props)
    // console.log("Tasks:", tasks)
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

            {this.state.tasks.map(task => (
              <Fragment key={uuidv4()}>
                <TaskCard
                  taskId={task.id}
                  chore={task.chore}
                  date={task.date}
                  isDone={task.isDone}
                  assigned={task.assigned}
                  groupId={3}
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
