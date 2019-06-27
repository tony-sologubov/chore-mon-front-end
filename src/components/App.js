import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";
import Landing from "../views/Landing";
import Dashboard from "../views/Dashboard/Dashboard";
import BillingPage from "../components/Billing/BillingPage";
import firebase, { FirebaseContext } from "../firebase";
import useAuth from "../components/Auth/useAuth";
import AddGroup from "../components/Groups/AddGroup";
import InProgress from "../views/InProgress";

import "../styles/index.css";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import Group from "../views/Group";
import AddTask from "./Tasks/AddTask";
import MyTasks from "../views/MyTasks";
import Profile from "../views/Profile";
import Settings from "../views/Settings";

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300 },
  exit: { opacity: 0 }
});

const App = () => {
  const user = useAuth();
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <Route
          render={({ location }) => (
            <div id="site-container">
              <PoseGroup>
                <RouteContainer key={location.pathname}>
                  <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/login" component={Login} />
                    <Route path="/forgot" component={ForgotPassword} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/add-group" component={AddGroup} />
                    <Route path="/billing" component={BillingPage} />
                    <Route path="/404" component={InProgress} />
                    <Route exact path="/groups/:groupId" component={Group} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/settings" component={Settings} />
                    <Route
                      exact
                      path="/groups/:groupId/add-task"
                      component={AddTask}
                    />
                    <Route path="/mytasks/:userId" component={MyTasks} />
                  </Switch>
                </RouteContainer>
              </PoseGroup>
            </div>
          )}
        />
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
};
export default App;
