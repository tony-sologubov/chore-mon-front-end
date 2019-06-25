import React, { Component } from "react";

class MemberCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>{this.props.email}</h1>
      </div>
    );
  }
}

export default MemberCard;
