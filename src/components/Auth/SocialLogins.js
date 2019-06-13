import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import FirebaseContext from '../../firebase/context'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig } from '../../firebase/uiconfig'
import firebase from 'firebase'

function SocialLogins({ history }) {
  const { firebase } = useContext(FirebaseContext)

  // async function LoginWithGoogle() {
  //   try {
  //     await firebase.auth.signInWithPopup(firebase.googleProvider)
  //   } catch (err) {
  //     console.error({ message: err.message })
  //   } finally {
  //     history.push('/dashboard')
  //   }
  // }

  // async function LoginWithFacebook() {
  //   try {
  //     await firebase.auth.signInWithPopup(firebase.facebookProvider)
  //   } catch (err) {
  //     console.error({ message: err.message })
  //   } finally {
  //     history.push('/dashboard')
  //   }
  // }

  // async function LoginWithTwitter() {
  //   try {
  //     await firebase.auth.signInWithPopup(firebase.twitterProvider)
  //   } catch (err) {
  //     console.error({ message: err.message })
  //   } finally {
  //     history.push('/dashboard')
  //   }
  // }

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth}/>
      {/* <button onClick={LoginWithGoogle}>Google</button>
      <button onClick={LoginWithFacebook}>Facebook</button>
      <button onClick={LoginWithTwitter}>Twitter</button> */}
    </div>
  )
}

export default withRouter(SocialLogins)
