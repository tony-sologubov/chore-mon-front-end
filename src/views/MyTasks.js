import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import TaskTable from "./Group/TaskTable";

// import Pic from "../../components/Pic";
// import TaskTable from "./TaskTable";
// import Modal from "react-responsive-modal";
// import TaskForm from "./TaskForm";

const uid = JSON.parse(localStorage.getItem("uid"));
const user = JSON.parse(localStorage.getItem("user"));
const url = "https://uffizzi-test.herokuapp.com/api";

class MyTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          groups: [],
          tasks: "",
          fetchedGroups: false,
          fetchedTasks: false,
          uid: uid,
          open: false,
          groupName: ""
        };
      }

    componentDidMount() {
        this.fetch();
    }


    fetch = () => {
        axios
        .get(`${url}/users/${uid}`)
        .then(res => {
        this.setState({
            name: res.data.name,
            groups: res.data.groups,
            photo: res.data.profilePicture,
            groupName: "",
            open: false,
            error: false,
            fetchedGroups: true,
            member: [res.data]
        });
        })
        .catch(err => {
        console.log(err.message);
        });
    };

    fetchTasks = () => {
        this.state.groups.forEach(group =>
        this.fetchGroup(group)
        )
        this.setState({ fetchedTasks: true})
    }

    fetchGroup = (group) => {
        const { groupId } = group
        axios
        .get(`https://uffizzi-test.herokuapp.com/api/group/${groupId}`)
        .then(res => {
        this.setState({
            tasks: [ 
                ...this.state.tasks, 
                { groupId: groupId, tasks: res.data.tasks.filter(task => task.assignedTo == this.state.uid)} ],
        });
        });
    };


  render() {
    if (this.state.fetchedGroups && !this.state.fetchedTasks) { this.fetchTasks() }
    const { name, members } = this.state;
    console.log(this.state)
    return (
        <div>
            <thead>
                <tr>
                    {this.state.groups.map(group => {
                        return (
                            <div>
                                <th>{group["name"]} </th>
                            {this.state.tasks
                                ?
                                this.state.tasks.map(taskObject => 
                                    {
                                        return (

                                           taskObject.groupId == group.groupId
                                            ?
                                            <TaskTable
                                                members={this.state.member}
                                                tasks={taskObject.tasks}
                                                groupId={group.groupId}
                                                edit={"this.editTask"}
                                                titleSubmit={"this.editTask"}
                                            />
                                            :
                                            ""
                                            )
                                    }
                                )
                                :
                                "loading"
                            }
                            </div>
                        )
                    })}
                </tr>
            </thead>
        </div>
    )
  }
}

export default withRouter(MyTasks);




// -----------