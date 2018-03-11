import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'

import Authenticated from '/imports/lib/Authenticated'

import { withTracker } from 'meteor/react-meteor-data'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Authenticated path='/admin' component={Dashboard} {...this.props}/>
          <Route component={Login} />
        </Switch>
      </Router>
    )
  }
}

export default withTracker(props => {
  const loggingIn = Meteor.loggingIn()
  const user = Meteor.user()
  const userId = Meteor.userId()
  const loading = Roles.subscription ? !Roles.subscription.ready() : true
  return {
    loggingIn,
    loading,
    user,
    userId,
    authenticated: !loggingIn && !!userId,
    roles: !loading && Roles.getRolesForUser(userId),
  }
})(App)