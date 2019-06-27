import React, { Component } from "react";
import GroupList from "./GroupList";
import Sidebar from "./Sidebar";
import { DashPhoto } from "../../components/Common";
import { ReactComponent as ContactsIcon } from "../../assets/dashboard/icons/contacts-icon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/dashboard/icons/profile.svg";
import { ReactComponent as HomeIcon } from "../../assets/dashboard/icons/home.svg";
import { ReactComponent as ListIcon } from "../../assets/dashboard/icons/list.svg";
import { ReactComponent as CalendarIcon } from "../../assets/dashboard/icons/calendar.svg";
import { ReactComponent as SettingsIcon } from "../../assets/dashboard/icons/settings.svg";
import axios from "axios";
const uid = JSON.parse(
  localStorage.getItem("firebaseui::rememberedAccounts")[0].uid
);
const user = JSON.parse(
  localStorage.getItem("firebaseui::rememberedAccounts")[0]
);
//
const url = "https://chore-monkey.herokuapp.com/api/";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.fetch();
    console.log(this.state);
  }

  fetch = () => {
    console.log(uid);
    axios
      .get(`${url}/user/${uid}`)
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    const { history } = this.props;

    return (
      <div className="Dashboard">
        <div className="dash-header ">
          <DashPhoto />
          <h1>
            Welcome Back,
            {" " + user.displayName.match(/[^\s,.'"!?]+/)[0]}
          </h1>
        </div>

        <div className="section-ctr">
          <Sidebar className="sidebar" />
          <div className="cards">
            <GroupList groups={this.state.user.groups} className="cards" />
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
      </div>
    );
  }
}

export default Dashboard;
