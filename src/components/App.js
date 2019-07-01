import React from "react";
import { Switch, Route } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";
import Landing from "../views/Landing";
import Dashboard from "../views/Dashboard/Dashboard";
import BillingPage from "../components/Billing/BillingPage";
import firebase, { FirebaseContext } from "../firebase";
import useAuth from "../components/Auth/useAuth";
import InProgress from "../views/InProgress";

import "../styles/index.css";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import Group from "../views/Group/Group";

import Profile from "../views/Profile";
import Settings from "../views/Settings";
import GroupSettings from "../views/GroupSettings";

const App = () => {
  const user = useAuth();
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <div id="site-container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/billing" component={BillingPage} />
          <Route path="/404" component={InProgress} />
          <Route exact path="/groups/:groupId" component={Group} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} />
          <Route path="/groupsettings" component={GroupSettings} />
        </Switch>
      </div>
    </FirebaseContext.Provider>
  );
};
export default App;
