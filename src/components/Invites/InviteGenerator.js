import React, { Component } from "react";
import axios from "axios";

const url = "https://chore-monkey-app.firebaseio.com"
// const url = "http://chore-monkey.firebaseapp.com"


class InviteGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inivteLink: "",
            groupID: 1,   //UPDATE THIS: we need to know where to fetch the group ID's from
        };
      }


    generateLink = e => {
        console.log('RUNNING')
        axios.post(`${url}/api/invite/create`, {
            "userID" : 1,   //remove when backend is updated
            "invitee" : 2,  //remove when backend is updated
            "groupID" : this.state.groupID,
        })
            .then( response => {
                console.log(response);
                console.log(response.data.message);
                console.log(response.data.inviteCode);
                this.setState((state, props) => ({
                    inivteLink: response.data.inviteCode
                }))
                // response.status(200).json({ message: response.message});
            })
            .catch( err => {
                console.log("ERROR\n\n\n\n");
                console.log(err.message);
                // err.status(500).json({ message: err.message })
            })
    }



      render () {
        if (!this.state.inivteLink) {
            return (
                <React.Fragment>
                    <button className="waves-effect waves-light btn-large pink accent-3" onClick={this.generateLink}> Inivite </button>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <h4> Share this link to invite a user to your group</h4>
                    <p> {this.state.inivteLink} </p>
                    <p> {this.state.groupID} </p>
                    <button onClick={this.generateLink}> Create a New Invite </button>
                </React.Fragment>
            )
        }

    }
};

export default InviteGenerator;
