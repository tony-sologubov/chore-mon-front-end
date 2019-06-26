import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { uiConfig } from '../../firebase/uiconfig';

class SocialLogins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      );
    }
    return <div>{this.props.history.push('/dashboard')}</div>;
  }
}

export default withRouter(SocialLogins);
