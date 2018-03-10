import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/admin' component={Dashboard} />
          <Route component={Login} />
        </Switch>
      </Router>
    )
  }
}

export default App