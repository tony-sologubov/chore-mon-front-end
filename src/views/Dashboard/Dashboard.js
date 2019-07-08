import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import GroupList from "./GroupList";
import DashPhoto from "../../components/DashPhoto";
import { ReactComponent as ContactsIcon } from "../../assets/dashboard/icons/contacts-icon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/dashboard/icons/profile.svg";
import { ReactComponent as HomeIcon } from "../../assets/dashboard/icons/home.svg";
import { ReactComponent as ListIcon } from "../../assets/dashboard/icons/list.svg";
import { ReactComponent as CalendarIcon } from "../../assets/dashboard/icons/calendar.svg";
import { ReactComponent as SettingsIcon } from "../../assets/dashboard/icons/settings.svg";
import axios from "axios";
import firebase from "../../firebase/firebase.js";

const uid = JSON.parse(localStorage.getItem("uid"));
console.log(uid);
const user = JSON.parse(localStorage.getItem("user"));
const url = "https://chore-monkey.herokuapp.com/api/";

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
    this.fetch();
  }

  fetch = () => {
    axios
      .get(`${url}/users/${uid}`)
      .then(res => {
        console.log(res);
        this.setState({
          name: res.data.name,
          groups: res.data.groups,
          photo: res.data.profilePicture,
          groupName: "",
          open: false,
          error: false
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
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
    let group = {
      creatorId: this.state.uid,
      name: this.state.groupName
    };

    axios
      .post(`${url}/group`, group)
      .then(res => {
        this.fetch();
      })
      .catch(er => console.log(er.message));
  };

  render() {
    const { history } = this.props;

    return (
      <div className=" background">
        <div className=" z-depth-1 Dashboard">
          <section className="top">
            <div className="tr">
              {/* Header */}
              <div className="dash-header ">
                <h1 className="message">
                  {"Hello there, " +
                    JSON.parse(
                      localStorage.getItem("firebaseui::rememberedAccounts")
                    )[0].displayName.match(/[^\s,.'"!?]+/)[0]}
                </h1>
              </div>

              {/* group list */}

              <div className="section-ctr">
                <div className="cards" id="style-6">
                  <GroupList groups={this.state.groups} className="cards" />
                </div>
              </div>
            </div>

            {/* sidebar  */}
            <div className="sidebar">
              <div className="tlt">
                {" "}
                <DashPhoto photo={this.state.photo} />
              </div>

              <button
                className="btn hvr-glow dash-but z-depth-1"
                onClick={this.open}
              >
                Make a List!
              </button>
            </div>
          </section>

          {/* icon buttons */}

          <div className="dash-buttons">
            <Link
              to={{
                pathname: `/find-friend`,
                state: {
                  groups: this.state.groups
                }
              }}
            >
              <div className="icon-div">
                <ContactsIcon className="di  hvr-push" />
                <p
                  className="  hvr-push"
                  onClick={() => {
                    history.push("/find-friend");
                  }}
                >
                  FRIENDS
                </p>
              </div>
            </Link>

            <Link
              to={{
                pathname: `/profile`
              }}
            >
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
            </Link>

            <Link to={{ pathname: `/` }}>
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
            </Link>

            <Link
              to={{
                pathname: `/mytasks/${uid}`
              }}
            >
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
            </Link>

            <Link
              to={{
                pathname: `/404`
              }}
            >
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
            </Link>

            <Link
              to={{
                pathname: `/settings/`
              }}
            >
              <div className="icon-div">
                <SettingsIcon
                  className="di hvr-push  "
                  onClick={() => {
                    history.push("/settings/profile");
                  }}
                />
                <p
                  className=" hvr-push  "
                  onClick={() => {
                    history.push("/settings/profile");
                  }}
                >
                  SETTINGS
                </p>
              </div>
            </Link>
          </div>

          {/* addGroupForm */}
          <Modal
            open={this.state.open}
            onClose={this.close}
            center
            showCloseIcon={true}
          >
            <div className="m">
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
      </div>
    );
  }
}

export default withRouter(Dashboard);
