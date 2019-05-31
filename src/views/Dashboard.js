import React, { useContext } from "react";
import { FirebaseContext } from "../firebase/index";
import GetGroups from "../components/Groups/GetGroups.js";
import DashPhoto from "../components/Avatar.js";
import { ReactComponent as ContactsIcon } from "../assets/dashboard/icons/contacts-icon.svg";
import { ReactComponent as ProfileIcon } from "../assets/dashboard/icons/profile.svg";
import { ReactComponent as HomeIcon } from "../assets/dashboard/icons/home.svg";
import { ReactComponent as ListIcon } from "../assets/dashboard/icons/list.svg";
import { ReactComponent as CalendarIcon } from "../assets/dashboard/icons/calendar.svg";
import { ReactComponent as SettingsIcon } from "../assets/dashboard/icons/settings.svg";

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

      <div className="groups">
        <button
          onClick={() => {
            history.push("/add-group");
          }}
          className="waves-effect waves-light btn-large"
        >
          New Group
        </button>
        <h2>My Family Groups</h2>
        <GetGroups />
      </div>

      <div className="dash-buttons">
        <ContactsIcon className="di  hvr-push" />
        <ProfileIcon className="di hvr-push  " />
        <HomeIcon className="di hvr-push  " />
        <ListIcon className="di hvr-push  " />
        <CalendarIcon className="di hvr-push  " />
        <SettingsIcon className="di hvr-push  " />
      </div>
    </div>
  );
}

export default Dashboard;
