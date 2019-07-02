import React from "react";
import { Switch, Route } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";
import Landing from "../views/Landing";
import Dashboard from "../views/Dashboard/Dashboard";
import BillingPage from "../components/Billing/BillingPage";
import firebase, { FirebaseContext } from "../firebase";
import useAuth from "../components/Auth/useAuth";
import requiresAuth from '../components/Auth/requiresAuth'

import InProgress from "../views/InProgress";

import "../styles/index.css";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import Group from "../views/Group/Group";
import TroopMates from "../views/TroopMates";
import Profile from "../views/Profile";
import Settings from "../views/Settings";
import GroupSettings from "../views/GroupSettings";
import UserProfile from "../views/UserProfile";

const App = () => {
  const user = useAuth();
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <div id="site-container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/user/:userId" component={requiresAuth(UserProfile)} />
          <Route path="/find-friend" component={requiresAuth(TroopMates)} />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/dashboard" component={requiresAuth(Dashboard)} />
          <Route path="/billing" component={requiresAuth(BillingPage)} />
          <Route path="/404" component={InProgress} />
          <Route exact path="/groups/:groupId" component={requiresAuth(Group)} />
          <Route path="/profile" component={requiresAuth(Profile)} />
          <Route path="/settings" component={requiresAuth(Settings)} />
          <Route path="/groupsettings" component={requiresAuth(GroupSettings)} />
        </Switch>
      </div>
    </FirebaseContext.Provider>
  );
};
export default App;
