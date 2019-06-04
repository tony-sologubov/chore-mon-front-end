import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase/index";
import GetGroups from "../../components/Groups/GetGroups.js";
import DashPhoto from "../../components/Avatar.js";
import Sidebar from "./Sidebar";
import { ReactComponent as ContactsIcon } from "../../assets/dashboard/icons/contacts-icon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/dashboard/icons/profile.svg";
import { ReactComponent as HomeIcon } from "../../assets/dashboard/icons/home.svg";
import { ReactComponent as ListIcon } from "../../assets/dashboard/icons/list.svg";
import { ReactComponent as CalendarIcon } from "../../assets/dashboard/icons/calendar.svg";
import { ReactComponent as SettingsIcon } from "../../assets/dashboard/icons/settings.svg";

function Dashboard({ history }) {
  const { user } = useContext(FirebaseContext);
  return (
    <div className="Dashboard">
      <div className="dash-header ">
        <DashPhoto />
        <h1>
          Welcome Back,
          {JSON.parse(localStorage.getItem("user")).displayName}
        </h1>
      </div>

      <div className="section-ctr">
        <Sidebar className="sidebar" />
        <div className="cards">
          <GetGroups className="cards" />
        </div>
      </div>

      <div className="dash-buttons">
        <ContactsIcon
          className="di  hvr-push"
          onClick={() => {
            history.push("/404");
          }}
        />
        <ProfileIcon
          className="di hvr-push  "
          onClick={() => {
            history.push("/404");
          }}
        />
        <HomeIcon
          className="di hvr-push  "
          onClick={() => {
            history.push("/add-group");
          }}
        />
        <ListIcon
          className="di hvr-push  "
          onClick={() => {
            history.push(`/404`);
          }}
        />
        <CalendarIcon
          className="di hvr-push  "
          onClick={() => {
            history.push("/add-group");
          }}
        />
        <SettingsIcon
          className="di hvr-push  "
          onClick={() => {
            history.push("/settings");
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
