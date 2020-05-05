import React from "react";
import "../../src/styles/profile.css";
import { ReactComponent as InstaIcon } from "../assets/profile-page/Insta.svg";
import { ReactComponent as PhoneIcon } from "../assets/profile-page/Phone.svg";
import { ReactComponent as ThumbIcon } from "../assets/profile-page/Thumb.svg";
import { ReactComponent as TweetIcon } from "../assets/profile-page/Tweet.svg";
import axios from "axios";
import Select from "../components/Select";

import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

const user = JSON.parse(localStorage.getItem("user"));
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const id = window.location.href.split("/").pop();
    axios
      .get(`https://uffizzi-test.herokuapp.com/api/users/${id}`)
      .then(res => {
        this.setState({
          name: res.data.name,
          uid: res.data.uid,
          location: res.data.location,
          profilePicture: res.data.profilePicture,
          coverPhoto: res.data.coverPhoto,
          memberId: "",
          groupId: 0,
          open: false
        });
      });
  };

  add = (m, props) => {
    axios
      .post(`https://uffizzi-test.herokuapp.com/api/groupmembers`, m)
      .then(res => {
        console.log(res);
      })
      .catch(er => console.log(er.message));
  };

  addFriend = (e, uid, friendId) => {
    const { history } = this.props;

    e.preventDefault();
    console.log("Add Friend Hiring");
    const friend1 = {
      userId: uid,
      friendId: friendId
    };

    const friend2 = {
      userId: friendId,
      friendId: uid
    };

    axios
      .post("https://uffizzi-test.herokuapp.com/api/friends", friend1)
      .then(
        axios
          .post("https://uffizzi-test.herokuapp.com/api/friends", friend2)
          .then(this.handleToast(this.Transition))
          .catch(err => console.log(err))
      )
      .catch(err => console.log(err));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // ----------------toast -------------------//
  Transition = props => {
    return <Slide {...props} direction="up" />;
  };
  handleToast = Transition => () => {
    this.setState({ open: true, Transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.props.location.state);

    return (
      <div className="profileContainer">
        <div className="header">
          <div className="coverPhoto">.</div>
          {this.state.profilePicture !== null ? (
            <img
              className="profilePhoto"
              alt="profile"
              src={this.state.profilePicture}
            />
          ) : (
            <img
              src="https://res.cloudinary.com/ryanboris/image/upload/v1561535196/profileplaceholder.png"
              alt="placeholder"
              width="150"
              height="200"
              className="placeholderPhoto"
            />
          )}
        </div>

        <div className="lower-block">
          <h1 className="profileName">{this.state.name}</h1>
          <h3 className="profileLocation">{this.state.location}</h3>
          <div className="socialLinks">
            <PhoneIcon className="hvr-push" />
            <ThumbIcon className="hvr-push" />
            <TweetIcon className="hvr-push" />
            <InstaIcon className="hvr-push" />
          </div>
          <Select
            userId={this.state.uid}
            add={this.add}
            groups={this.props.location.state.groups}
          />
          <div className="profileBtn">
            <button
              onClick={e => this.addFriend(e, user.uid, this.state.uid)}
              className="connectBtn hvr-push"
            >
              CONNECT
            </button>
            <Snackbar
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={this.state.Transition}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={
                <span id="message-id">
                  You and {this.state.name} are friends!
                </span>
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
