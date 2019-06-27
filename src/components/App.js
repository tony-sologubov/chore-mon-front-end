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
      user: "",
    };
  }

  componentDidMount() {
    console.log("firing")
    // this.setHerokuUser()
  }

  // setHerokuUser() {
  //   axios.get('http://localhost:9000/api/users/').then(users => { 
  //     users.data.forEach(user => {
  //       if (user.uid == fbUser.uid) {
  //         this.setState({ user: user })
  //       }
  //     })
  //   })
  // };


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
