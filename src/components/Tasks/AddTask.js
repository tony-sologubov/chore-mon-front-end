import React, { Component } from 'react';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfilePhotoTask from './TaskAvatar'


class AddTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      chore:'',
      assigned: [],
      date: '',
      isDone: false,
      members: this.props.location.state.members
    }
  }
  
    handleSubmit = () => {
      console.log('this is submitting')
      console.log(this.state)
      console.log(this.state.assigned)
      axios
        .post(
          'http://localhost:9000/api/tasks/',
            {
            title: this.state.chore,
            assignedTo: this.state.assigned.id,
            dueDate: this.state.date,
            groupId:1,
            listId:1
          })
        .then(response => {
          this.setState(
            console.log('hello tasks is working', response.data)
          )
        .catch(err => {
          console.log('task error', err)
        })
      })
    }

    handleChange(event){
      this.setState({
        [event.target.name] : event.target.value
      })
    }

    handleAssignClick(member) {
      console.log("Handle Assign Firing")
        this.setState({ assigned: member })
        console.log("Not Included Member: State")
      }
    // }

    render() {
      console.log("State")
      console.log(this.state)
      return(
        <div className="taskBackGround">
        <div className="addTaskDiv">
            <h2 className="add-task-title">New Task</h2>
            <form onSubmit={this.handleSubmit} className="addTaskForm">
              <input
                type="text"
                name="chore"
                placeholder="Add a Task"
                value={this.state.chore}
                onChange={event => this.handleChange(event)}
              />
        
              <label htmlFor="date" className="dueDateText">Due Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                placeholder="date"
                value={this.state.date}
                onChange={event => this.handleChange(event)}
              />
        
        
                  {/* <input
                    type="text"
                    name="assigned"
                    placeholder="Assign a Person"
                    value={values.assigned}
                    onChange={event => handleChange(event)}
                  /> */}
                  <div>
            <div>Assigned To:</div>
            <ExpansionPanel className="grey lighten-3 editModalRound">
                  <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="pink accent-3 editModalRound"
                  >
                      <div className="modalButtonText">
                          People In The Group!
                      </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                      <div>
                
                      {this.state.members.map(member => (
                        <div> 
                          <ProfilePhotoTask 
                            key={member.userId} 
                            user={member}
                            onClick={event => this.handleAssignClick(member)}/>
                        </div>
                        ))}
        
                        <input
                        style= {{marginTop: "19px"}}
                        type="text"
                        name="assigned"
                        placeholder="Assign a Person"
                        value={this.state.assigned.name}
                        onChange={event => this.handleChange(event)}
                      />
                      </div>
                  </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
              <button 
              type="submit" 
              value="submit" 
              className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical submit-button">
                {/* <input type="submit" value="submit" /> */}
                Submit
                </button>
                {/* {errors.values && <p>{errors.values}</p>} */}
              </form>
            </div>
          </div>
      )
    }
  }

  export default AddTask