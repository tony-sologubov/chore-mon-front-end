import React, { Component } from "react";
import axios from "axios";

class InvitePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: 0
    };
  }
  componentDidMount() {
    this.getStuff();
  }

  getStuff() {
    const groupId = window.location.href.split("/").pop();
    const uid = localStorage.getItem("uid");
    axios.get(----) // get the group by groupId and set the groupname to state 
    this.setState({
      groupId: groupId,
      uid: uid
    });
  }

  render() {
      const { groupName } = this.state; 
    return (
      <div className="invite-page-container">
        <div className="card">
          <h1>You've been invited to join {groupName}!</h1>
          <div className="invite-buttons">
              <button>Yes</button>
              <button>No</button>
          </div>
        </div>
      </div>
    );
  }
}

export default InvitePage;
