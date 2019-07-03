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

const uid = JSON.parse(localStorage.getItem("uid"));
const user = JSON.parse(localStorage.getItem("user"));
const url = "https://chore-monkey.herokuapp.com/api";

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
        this.setState({
          name: res.data.name,
          groups: res.data.groups,
          photo: res.data.profilePicture,
          groupName: "",
          o: false,
          error: false
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  o = () => {
    this.setState({ o: true });
  };

  c = () => {
    this.setState({ o: false });
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
      <div className="Dashboard">
        <div className="dash-header ">
          <DashPhoto photo={this.state.photo} />
          <h1>
            {"Welcome Back, " +
              JSON.parse(
                localStorage.getItem("firebaseui::rememberedAccounts")
              )[0].displayName.match(/[^\s,.'"!?]+/)[0]}
          </h1>
        </div>

        <div className="section-ctr">
          <div className="sidebar">
            <button className="btn hvr-glow" onClick={this.o}>
              New Group
            </button>
          </div>
          <div className="cards">
            <GroupList groups={this.state.groups} className="cards" />
          </div>
        </div>
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
        </div>

        {/* addGroupForm */}
        <Modal
          open={this.state.o}
          onClose={this.c}
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

export default withRouter(Dashboard);
