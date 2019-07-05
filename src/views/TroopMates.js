import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class TroopMates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      email: "",
      name: "",
      results: [],
      term: ""
    };
  }

  componentDidMount() {
    this.users();
  }
  handleChange = async e => {
    await this.setState({ [e.target.name]: e.target.value });
  };
  users = () => {
    axios
      .get("https://chore-monkey.herokuapp.com/api/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    const { name, users, results, email, term } = this.state;

    return (
      <div>
        <div className="search-cards">
          {users.map(m => {
            return (
              <Link
                id={m.uid}
                key={m.uid}
                to={{
                  pathname: `/user/${m.uid}`,
                  state: {
                    groups: this.props.location.state
                  }
                }}
              >
                <div className="card ">
                  <div className="card-image center-align">
                    <img src={m.profilePicture} alt="profile of user" />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{m.name}</h3>
                    <p>{m.location}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TroopMates;
