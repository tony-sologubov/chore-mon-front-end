import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'
import LandingPage from '../views/Landing'
import Dashboard from '../views/Dashboard/Dashboard'
import BillingPage from '../components/Billing/BillingPage'
import firebase, { FirebaseContext } from '../firebase'
import useAuth from '../components/Auth/useAuth'
import AddGroup from '../components/Groups/AddGroup'
import InProgress from '../views/InProgress'

import '../styles/index.css'
import Login from './Auth/Login'
import ForgotPassword from './Auth/ForgotPassword'
import Group from '../views/Group'
import AddTask from './Tasks/AddTask'
import MyTasks from '../views/MyTasks'
import Profile from '../views/Profile'
import Settings from '../views/Settings'
import axios from 'axios';


const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300 },
  exit: { opacity: 0 }
})
const usersUrl = "http://localhost:9000/api/users/"
const groupUrl = 'http://localhost:9000/api/group/';
const groupMembersUrl = 'http://localhost:9000/api/groupmembers';
const fbUser = JSON.parse(localStorage.getItem('user'))
const providerUser = JSON.parse(localStorage.getItem('user'))

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      tasks: [],
      members: [],
      user: "",
      currentGroup: 0
    };
  }

  componentDidMount() {
    console.log("firing")
   
    this.fetchGroups()
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.user != prevState.user) {
  //     this.fetchGroups()
  //   }
  // }

  // setHerokuUser() {
  //   axios.get('http://localhost:9000/api/users/').then(users => { 
  //     users.data.forEach(user => {
  //       if (user.uid == fbUser.uid) {
  //         this.setState({ user: user })
  //       }
  //     })
  //   })
    
  // };
  fetchGroups = () => {
    if (fbUser) {
      console.log("FIRED")
      if (this.state.user === "") {
      axios.get('http://localhost:9000/api/users/').then(users => { 
        users.data.forEach(user => {
          if (user.uid == fbUser.uid) {
            this.setState({ user: user })
          }
        })
      })
      }
      axios.get(`${groupMembersUrl}/user/${this.state.user.id}`).then(memberships =>
        memberships.data.data.forEach(groupMembership =>
          axios.get(`${groupUrl}/${groupMembership.groupId}`).then(group => {
            this.setState({ groups: [...this.state.groups, group.data.data[0]] });
          })
        )
      );
    }
  };


  fetchMembers = (groupId) => {
    
  
  axios
    .get(`${groupMembersUrl}/group/${groupId}`)
    .then(groupMems => groupMems.data.forEach(data =>
      axios
      .get(`${usersUrl}/${data.userId}`)
      .then(user => {
        const arr = [1,2,3]
        (this.state.members.includes(user.data.data[0]))
        if (!this.state.members.includes(user.data.data[0])){
          this.setState({ members: [...this.state.members, user.data.data[0]]})
        }
      })
      .catch(error => console.log(error))
      ))
    .catch(error => console.log(error))
    }

  


    deleteGroup = () => {
      console.log('DELETING')
      const groupId = this.state.currentGroup
      axios
      .delete(`http://localhost:9000/api/group/${groupId}`)
      .then(response => {
        this.setState({ group: response.data })
        this.fetchGroups();
      })
      .catch(err => {console.log(err)})

      axios
      .get(`${groupMembersUrl}group/${groupId}`)
      .then(groupMemberships => {
        console.log(groupMemberships)
        groupMemberships.data.forEach(entry => {
          axios
          .delete(`${groupMembersUrl}remove/${entry.id}`)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
        })
      })

    }
    
    setCurrentGroup = (id) => {
      console.log("Set Group Firing")
      this.setState({ currentGroup: id})
    }

  render () {
    console.log("State")
    console.log(this.state)
    return (
      <BrowserRouter>
        <FirebaseContext.Provider value={{ providerUser, firebase }}>
          <Route
            render={({ location }) => (
              <div id="site-container">
                <PoseGroup>
                  <RouteContainer key={location.pathname}>
                    <Switch>
                      <Route exact path="/" component={LandingPage} />
                      <Route path="/login" component={Login} />
                      <Route path="/forgot" component={ForgotPassword} />
                      <Route path="/dashboard" render={(props) => <Dashboard {...props} tasks={this.state.tasks} members={this.state.members} groups={this.state.groups} fetchGroups={this.fetchGroups} deleteGroups={this.deleteGroups} />} />
                      <Route path="/add-group" component={AddGroup} />
                      <Route path="/billing" component={BillingPage} />
                      <Route path="/404" component={InProgress} />
                      <Route exact path="/groups/:groupId" render={(props) => <Group {...props} fetchMembers={this.fetchMembers} deleteGroup={this.deleteGroup} setCurrentGroup={this.setCurrentGroup} members={this.state.members} />} />
                      <Route path="/profile" component={Profile} />
                      <Route path="/settings" component={Settings} />
                      <Route
                        exact
                        path="/groups/:groupId/add-task"
                        component={AddTask}
                      />
                      <Route path="/mytasks/:userId" component={MyTasks} />
                    </Switch>
                  </RouteContainer>
                </PoseGroup>
              </div>
            )}
          />
        </FirebaseContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
