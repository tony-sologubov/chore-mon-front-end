import React from "react";
import "../../src/styles/settings.css";
import Modal from "react-modal";
import BillingPage from "../components/Billing/BillingPage";
import Profile from "./Profile";
import GroupSettings from "./GroupSettings";
import MiniDrawer from "./MiniDrawer"
import { Switch, Route, withRouter } from "react-router-dom";



const user = JSON.parse(localStorage.getItem("user"))

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="settingsContainer">
        <MiniDrawer props={this.props} />
        <Switch>
            <Route exact path="/settings/profile" component={Profile} />
            <Route exact path="/settings/groups" component={GroupSettings} />
            <Route exact path="/settings/account" component={Profile} />
            <Route path="/settings/billing" component={BillingPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Settings);
