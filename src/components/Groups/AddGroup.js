import React, { useContext, useEffect, Component } from 'react'
import useFormValidation from '../Auth/useFormValidation'
// import FirebaseContext from '../../firebase/context'
import axios from 'axios';
import '../../styles/addgroups.css'


class AddGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: [],
      groups:[],

    }
  }
  // const userId = JSON.parse(localStorage.get('user'))
  handleSubmit = (groupName) => {
    const {history} = this.props
    console.log('its submiting', this.handleSubmit)
    axios
    .post(`http://localhost:9000/api/group`, {name:this.state.groupName, creatorId:1})
    .then(response => {
      console.log("Response:", response)
      console.log("Response:", response.data.id[0])
      axios
      .post('http://localhost:9000/api/groupmembers', { userId: 5, groupId: response.data.id[0], isAdmin: true })
      .then(response =>
        console.log("Success!:", response))
      .catch(error => 
        console.log("Failure!:", error))
      this.setState({ groups: [groupName, ...this.state.groups] })
      console.log('hello this is firing for adding',response.data)
    })
    .catch(err => {
      console.log('here is the error',err)
    })
    .finally(history.push('/dashboard'))
}

  handleChange(event){
    this.setState({
      groupName: event.target.value
      // [event.target.value] : event.target.value
    })
    
  }

  render(){
    // const {history} = this.props
    return (
      <div className="groupBackGround">
  <div className="addGroupDiv">
      <h2>New Group</h2>
      <form onSubmit={this.handleSubmit} className="addGroupForm">
        <input
          type="text"
          name="groupName"
          placeholder="Add a Group"
          value={this.state.groupName}
          onChange={event => this.handleChange(event)}
        />
        <button type="submit" 
        value="submit" 
        className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical">
        Submit
        </button>
        {/* {this.errors.groupName && <p>{this.errors.groupName}</p>} */}
      </form>
      </div>
      </div>
    )
  }
}

export default AddGroup