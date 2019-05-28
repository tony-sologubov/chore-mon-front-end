import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FirebaseContext } from '../firebase/index'

const NavBar = ({ history }) => {
  const { firebase, user } = useContext(FirebaseContext)
  return (
    <nav className="nav-wrapper black">
      <ul>
        <li>
          <Link to={user ? '/dashboard' : '/login'}>Dashboard</Link>
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
              className="waves-effect waves-light pink-text lighten-5 btn transparent"
              to="/login"
            >
              Login
            </Link>
          </li>
        ) : (
          <li
            onClick={() => {
              firebase.logout()
              history.push('/')
            }}
          >
            Logout
          </li>
        )}
      </ul>
    </nav>
  )
}

export default withRouter(NavBar)
