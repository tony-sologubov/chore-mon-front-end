import React, { Component } from "react";
import Modal from "react-responsive-modal";
import GroupList from "./GroupList";
import { DashPhoto } from "../../components/Common";
import { ReactComponent as ContactsIcon } from "../../assets/dashboard/icons/contacts-icon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/dashboard/icons/profile.svg";
import { ReactComponent as HomeIcon } from "../../assets/dashboard/icons/home.svg";
import { ReactComponent as ListIcon } from "../../assets/dashboard/icons/list.svg";
import { ReactComponent as CalendarIcon } from "../../assets/dashboard/icons/calendar.svg";
import { ReactComponent as SettingsIcon } from "../../assets/dashboard/icons/settings.svg";
import axios from "axios";

const uid = JSON.parse(localStorage.getItem("uid"));
const user = JSON.parse(localStorage.getItem("user"));
const url = "https://chore-monkey.herokuapp.com/api";
console.log(uid);
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      groups: [],
      uid: uid,
      open: false,
      groupName: ""
    };
  }

  componentDidMount() {
    console.log("mounting");
    this.fetch();
    console.log(this.state);
  }

  fetch = () => {
    console.log(uid);
    axios
      .get(`${url}/users/${uid}`)
      .then(res => {
        console.log(res);
        this.setState({
          name: res.data.name,
          groups: res.data.groups,
          groupName: "",
          open: false,
          error: false
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  //Change Handler
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = e => {
    e.preventDefault();
    this.addGroup();
  };
  //add group functions
  addGroup = () => {
    if (this.state.groupName === "") {
      this.setState({
        error: true
      });
      return;
    }
    const group = {
      creatorId: this.state.uid,
      name: this.state.groupName
    };
    axios
      .post(`${url}/group`, group)
      .then(res => {
        console.log(res);
        this.fetch();
      })
      .catch(er => console.log(er.message));
  };

  //Opens delete modal
  openModal = () => {
    this.setState({ open: true, error: false });
  };

  //Closes delete modal
  closeModal = () => {
    this.setState({ open: false, error: false });
  };

  render() {
    const { history } = this.props;
    console.log(this.state);
    console.log(user);
    return (
      <div className="Dashboard">
        <div className="dash-header ">
          <DashPhoto />
          <h1>
            Welcome Back,
            {" " + user.displayName}
          </h1>
        </div>

        <div className="section-ctr">
          <div className="sidebar">
            <button className="btn hvr-glow" onClick={this.openModal}>
              New Group
            </button>
          </div>
          <div className="cards">
            <GroupList groups={this.state.groups} className="cards" />
          </div>
        </div>

        <div className="dash-buttons">
          <div className="icon-div">
            <ContactsIcon
              className="di  hvr-push"
              onClick={() => {
                history.push("/404");
              }}
            />
            <p
              className="  hvr-push"
              onClick={() => {
                history.push("/404");
              }}
            >
              CONTACTS
            </p>
          </div>

          <div className="icon-div">
            <ProfileIcon
              className="di hvr-push  "
              onClick={() => {
                history.push("/profile");
              }}
            />
            <p
              className=" hvr-push  "
              onClick={() => {
                history.push("/404");
              }}
            >
              PROFILE
            </p>
          </div>

          <div className="icon-div">
            <HomeIcon
              className="di hvr-push  "
              onClick={() => {
                history.push("/");
              }}
            />
            <p
              className=" hvr-push  "
              onClick={() => {
                history.push("/");
              }}
            >
              HOME
            </p>
          </div>

          <div className="icon-div">
            <ListIcon
              className="di hvr-push  "
              onClick={() => {
                history.push(`/mytasks/${uid}`);
              }}
            />
            <p
              className=" hvr-push  "
              onClick={() => {
                history.push(`/mytasks/${uid}`);
              }}
            >
              MY TASKS
            </p>
          </div>

          <div className="icon-div">
            <CalendarIcon
              className="di hvr-push  "
              onClick={() => {
                history.push("/404");
              }}
            />
            <p
              className=" hvr-push  "
              onClick={() => {
                history.push("/404");
              }}
            >
              CALENDAR
            </p>
          </div>

          <div className="icon-div">
            <SettingsIcon
              className="di hvr-push  "
              onClick={() => {
                history.push("/settings");
              }}
            />
            <p
              className=" hvr-push  "
              onClick={() => {
                history.push("/settings");
              }}
            >
              SETTINGS
            </p>
          </div>
        </div>
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          center
          showCloseIcon={false}
        >
          <div className="modal">
            <form onSubmit={e => this.submit(e)} className="addGroupForm">
              <input
                type="text"
                name="groupName"
                placeholder="Add a Group"
                value={this.state.groupName}
                onChange={event => this.handleChange(event)}
              />
              <button
                type="submit"
                className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical"
              >
                Submit
              </button>
              {this.state.error && (
                <p className="form-error">Name cannot be empty!</p>
              )}
            </form>
          </div>
        </Modal>
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
