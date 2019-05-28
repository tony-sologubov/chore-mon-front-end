import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'
import LandingPage from '../views/Landing'
import NavBar from '../views/NavBar'
import Dashboard from '../views/Dashboard'
import BillingPage from '../views/billing/BillingPage'
import firebase, { FirebaseContext } from '../firebase'
import useAuth from '../components/Auth/useAuth'

import '../styles/index.css'
import Login from './Auth/Login'
import ForgotPassword from './Auth/ForgotPassword'

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300 },
  exit: { opacity: 0 }
})

const App = () => {
  const user = useAuth()
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <Route
          render={({ location }) => (
            <div id="site-container">
              <NavBar />
              <PoseGroup>
                <RouteContainer key={location.pathname}>
                  <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/login" component={Login} />
                    <Route path="/forgot" component={ForgotPassword} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/billing" component={BillingPage} />
                  </Switch>
                </RouteContainer>
              </PoseGroup>
            </div>
          )}
        />
      </FirebaseContext.Provider>
    </BrowserRouter>
  )
}
export default App
