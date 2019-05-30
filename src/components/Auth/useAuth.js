import { useState, useEffect } from 'react'
import firebase from '../../firebase/'

function useAuth() {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
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
