import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FirebaseContext } from '../firebase/index'

const NavBar = () => {
  const { firebase, user } = useContext(FirebaseContext)
  return (
    <nav className="nav-wrapper black">
      <ul>
        <li className={user ? '' : 'toggle-link'}>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/billing">Go Premium</Link>
        </li>

        <li>
          <Link
            className="waves-effect waves-light pink-text lighten-5 btn transparent"
            to="/"
          >
            Home
          </Link>
        </li>

        {!user ? (
          <li>
            <Link
              to="/login"
              className="waves-effect waves-light pink-text lighten-5 btn transparent"
            >
              Login
            </Link>
          </li>
        ) : (
          <li
            onClick={() => {
              firebase.logout()
            }}
          >
            <Link
              to="/"
              className="waves-effect waves-light pink-text lighten-5 btn transparent"
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default withRouter(NavBar)
