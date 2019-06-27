import React, { Component } from 'react';
import GetGroups from '../../components/Groups/GetGroups.js';
import Sidebar from './Sidebar';
import { DashPhoto } from '../../components/Common';
import { ReactComponent as ContactsIcon } from '../../assets/dashboard/icons/contacts-icon.svg';
import { ReactComponent as ProfileIcon } from '../../assets/dashboard/icons/profile.svg';
import { ReactComponent as HomeIcon } from '../../assets/dashboard/icons/home.svg';
import { ReactComponent as ListIcon } from '../../assets/dashboard/icons/list.svg';
import { ReactComponent as CalendarIcon } from '../../assets/dashboard/icons/calendar.svg';
import { ReactComponent as SettingsIcon } from '../../assets/dashboard/icons/settings.svg';
import axios from 'axios';

const groupUrl = 'http://localhost:9000/api/group/';
const groupMembersUrl = 'http://localhost:9000/api/groupmembers/';
const fbUser = JSON.parse(localStorage.getItem('user'))
// firebaseui::rememberedAccounts


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      groups: [],
      currentGroup: 0
    };
  }

   componentDidMount() {
     console.log(fbUser)
     console.log(fbUser.uid)
     this.fetchGroups()
     console.log("State:\n", this.state)
   }

   fetchGroups = () => {
     if (fbUser) {
        axios.get(`http://localhost:9000/api/users/uidstring0`).then(user => { 
          console.log("Fetched Groups")
          console.log(user)
          console.log(user.data.groups)
          this.setState({groups: user.data.groups})
     })
    }
  }


  // fetchGroups = () => {
  //   if (fbUser) {
  //     console.log("FIRED")
  //     if (this.state.user === "") {
  //     axios.get('http://localhost:9000/api/users/').then(users => { 
  //       users.data.forEach(user => {
  //         if (user.uid == fbUser.uid) {
  //           this.setState({ user: user })
  //         }
  //       })
  //     })
  //     }
  //     axios.get(`${groupMembersUrl}/user/${this.state.user.id}`).then(memberships =>
  //       memberships.data.data.forEach(groupMembership =>
  //         axios.get(`${groupUrl}/${groupMembership.groupId}`).then(group => {
  //           this.setState({ groups: [...this.state.groups, group.data.data[0]] });
  //         })
  //       )
  //     );
  //   }
  // };

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


  render() {
    const { history } = this.props;

    return (
      <div className="Dashboard">
        <div className="dash-header ">
          {JSON.parse(localStorage.getItem('user'))
            .photoURL !== null ? (
            <DashPhoto />
          ) : (
            <img
              src="https://res.cloudinary.com/ryanboris/image/upload/v1561535196/profileplaceholder.png"
              alt="placeholder"
              width="75"
              height="100"
            />
          )}
          <h1>
            Welcome Back,
            {' ' +
              JSON.parse(
                localStorage.getItem('user')
              ).displayName.match(/[^\s,.'"!?]+/)[0]}
          </h1>
        </div>

        <div className="section-ctr">
          <Sidebar className="sidebar" />
          <div className="cards">
            <GetGroups
              groups={this.state.groups}
              fetchUsers={this.fetchUsers}
              className="cards"
            />
          </div>
        </div>

        <div className="dash-buttons">
          <div className="icon-div">
            <ContactsIcon
              className="di  hvr-push"
              onClick={() => {
                history.push('/404');
              }}
            />
            <p
              className="  hvr-push"
              onClick={() => {
                history.push('/404');
              }}
            >
              CONTACTS
            </p>
          </div>

          <div className="icon-div">
            <ProfileIcon
              className="di hvr-push  "
              onClick={() => {
                history.push('/profile');
              }}
            />
            <p
              className=" hvr-push  "
              onClick={() => {
                history.push('/404');
              }}
            >
              PROFILE
            </p>
          </div>

          <div className="icon-div">
            <HomeIcon
              className="di hvr-push  "
              onClick={() => {
                history.push('/');
              }}
            />
            <p
              className=" hvr-push  "
              onClick={() => {
                history.push('/');
              }}
            >
              HOME
            </p>
          </div>

          <div className="icon-div">
            <ListIcon
              className="di hvr-push  "
              onClick={() => {
                history.push(
                  `/mytasks/${
                    JSON.parse(localStorage.getItem('user'))
                      .uid
                  }`
                );
              }}
            />
            <p
              className=" hvr-push  "
              onClick={() => {
                history.push(
                  `/mytasks/${
                    JSON.parse(localStorage.getItem('user'))
                      .uid
                  }`
                );
              }}
            >
              MY TASKS
            </p>
          </div>

          <div className="icon-div">
            <CalendarIcon
              className="di hvr-push  "
              onClick={() => {
                history.push('/404');
              }}
            />
            <p
              className=" hvr-push  "
              onClick={() => {
                history.push('/404');
              }}
            >
              CALENDAR
            </p>
          </div>

          <div className="icon-div">
            <SettingsIcon
              className="di hvr-push  "
              onClick={() => {
                history.push('/settings');
              }}
            />
            <p
              className=" hvr-push  "
              onClick={() => {
                history.push('/settings');
              }}
            >
              SETTINGS
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

// NOTE: I'm keeping this just in case. If the backend gives us back the
// group members like we want, this can safely be deleted
// fetchMembers = (groupId) => {
    
  
//   axios
//     .get(`${groupMembersUrl}/group/${groupId}`)
//     .then(groupMems => groupMems.data.forEach(data =>
//       axios
//       .get(`${usersUrl}/${data.userId}`)
//       .then(user => {
//         const arr = [1,2,3]
//         (this.state.members.includes(user.data.data[0]))
//         if (!this.state.members.includes(user.data.data[0])){
//           this.setState({ members: [...this.state.members, user.data.data[0]]})
//         }
//       })
//       .catch(error => console.log(error))
//       ))
//     .catch(error => console.log(error))
//     }

// setCurrentGroup = (id) => {
//   console.log("Set Group Firing")
//   this.setState({ currentGroup: id})
// }