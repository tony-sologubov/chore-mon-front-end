import { useState, useEffect } from 'react'
import firebase from '../../firebase/'
import * as queryString from 'query-string'

function useAuth() {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (firebase.auth.isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn')
        const parsed = queryString.parse(window.location.search)
        console.log(parsed)

        if (!email) {
          email = window.prompt('Please provide your email for confirmation.')
        }

        firebase.auth
          .signInWithEmailLink(email, window.location.href)
          .then(function(result) {
            window.localStorage.removeItem('emailForSignIn')
            window.localStorage.setItem('user', JSON.stringify(user))
            return firebase.firestore
              .collection(
                `users/${parsed.userId}/groups/${parsed.groupId}/members`
              )
              .doc(result.user.uid)
              .set({
                userId: result.user.uid,
                displayName: result.user.displayName,
                profilePicture: result.user.photoURL
              })
          })
          .catch(function(err) {
            console.log({ code: err.code, msg: err.message })
          })
      } else if (user) {
        setAuthUser(user)
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        setAuthUser(null)
        localStorage.clear()
      }
    })
    return () => unsubscribe()
  }, [])

  return authUser
}

export default useAuth
