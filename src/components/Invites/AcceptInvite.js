import React, { Component } from "react";
import axios from "axios";

const url = "http://chore-monkey.herokuapp.com"


class InviteGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteCode: "",
            userId: 5  //get dynamically when we know where we're getting it from
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value})
    }


    acceptInvitation = e => {
        console.log('RUNNING')
        axios.post(`${url}/api/invite/join`, {
            "userId" : this.state.userId,
            "inviteCode" : this.state.inviteCode
        })
            .then( response => {
                console.log(response);
                console.log(response.data.message);
                this.setState((state, props) => ({
                    inviteCode: ""
                }))
            })
            .catch( err => {
                console.log("ERROR\n\n\n\n");
                this.setState((state, props) => ({
                    inviteCode: "Your code is broken. Please, try a new one."
                }))
            })
    }

      render () {
            return (
                <React.Fragment>
                    <input
                        type='text'
                        name='inviteCode'
                        value={this.state.inviteCode}
                        placeholder="Enter your invite code here..."
                        onChange={this.handleChange}
                    ></input>
                    <button onClick={this.acceptInvitation}> Join Group </button>
                </React.Fragment>
            )
        }
};

export default InviteGenerator;
