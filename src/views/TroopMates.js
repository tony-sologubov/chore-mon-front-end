import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import TinyPic from "../components/TinyPic";

const user = JSON.parse(localStorage.getItem("user"));
class TroopMates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      email: "",
      name: "",
      results: [],
      term: "",
      filtered: [],
      friends: [],
      allFriendships: []
    };
  }

  componentDidMount() {
    console.log("Component Mounting");
    this.fetchMonkeys();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchMonkeys = () => {
    const uid = user.uid;
    axios
      .get("https://chore-monkey.herokuapp.com/api/users")
      .then(res => {
        this.setState({ filtered: "", users: res.data });
      })
      .catch(err => {
        console.log(err.message);
      });

    axios
      .get(`https://chore-monkey.herokuapp.com/api/friends/`)
      .then(res => {
        this.setState({
          allFriendships: res.data
        });
      })
      .catch(err => console.log(err));

    axios
      .get(`https://chore-monkey.herokuapp.com/api/friends/${uid}`)
      .then(res => {
        this.setState({
          friends: res.data
        });
      })
      .catch(err => console.log(err));
  };

  search = (e, term) => {
    e.preventDefault();
    const results = [];
    console.log("SEARCH FIRED", term);
    console.log("users on state", this.state.users);
    console.log("filtered on state", this.state.filtered);
    this.state.users.forEach(u => {
      if (u.name.toLowerCase().includes(term.toLowerCase())) {
        return results.push(u);
      }
    });

    this.setState({
      filtered: results,
      searchTerm: ""
    });
  };

  findFriend = friendId => {
    const mem = this.state.users.filter(m => m.uid === friendId);

    if (mem[0]) {
      return mem[0];
    } else {
      return { profilePicture: "none", name: "none", location: "none" };
    }
  };

  f = friendId => {
    const mem = [];
    this.state.users.forEach(m => {
      if (m.uid === friendId) {
        mem.push(m);
      }
    });

    if (mem[0]) {
      console.log(mem[0]);
      return mem[0];
    }
  };

  render() {
    const { name, users, results, email, term } = this.state;
    console.log(this.state.filtered.length);
    if (this.state.filtered.length !== 0) {
      return (
        <div className="results">
          {this.state.filtered.map(m => {
            return (
              <div>
                <div>
                  <Link
                    to={{
                      pathname: `/user/${m.uid}`,
                      state: {
                        groups: this.props.location.state
                      }
                    }}
                  >
                    <div className="card hoverable">
                      <TinyPic photo={m.profilePicture} />
                      <p>{m.name}</p>
                      <p>{m.location}</p>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="search">
          <div className="search-bg z-depth-1">
            <div class="row">
              <form
                onSubmit={e => this.search(e, this.state.term)}
                class="col s12"
              >
                <div class="row">
                  <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input
                      id="icon_prefix"
                      type="text"
                      class="validate"
                      name="term"
                      value={this.state.term}
                      onChange={this.handleChange}
                    />
                    <label for="icon_prefix">Find Friends!</label>
                  </div>
                </div>
              </form>
            </div>

            <h1>My Monkey Mates!</h1>

            <div className="search-cards" id="style-6">
              {this.state.friends.map(m => {
                return (
                  <Link
                    to={{
                      pathname: `/user/${m.friendId}`,
                      state: {
                        groups: this.props.location.state
                      }
                    }}
                  >
                    <div className="card hoverable">
                      <div className="card-image center-align">
                        <img
                          src={this.findFriend(m.friendId).profilePicture}
                          alt="profile of user"
                        />
                      </div>
                      <div class="card-content">
                        <h3 className="card-title">
                          {this.findFriend(m.friendId).name}
                        </h3>
                        <p>{this.findFriend(m.friendId).location}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default TroopMates;
