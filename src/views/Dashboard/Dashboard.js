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
  }



  render() {
    const { history } = this.props;

    return (
      <div className="Dashboard">
        <div className="dash-header ">
          {JSON.parse(localStorage.getItem('user'))[0]
            .photoUrl !== null ? (
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
                localStorage.getItem('firebaseui::rememberedAccounts')
              )[0].displayName.match(/[^\s,.'"!?]+/)[0]}
          </h1>
        </div>

        <div className="section-ctr">
          <Sidebar className="sidebar" />
          <div className="cards">
            <GetGroups
              groups={this.props.groups}
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
                    JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts'))[0]
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
                    JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts'))[0]
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
