import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import ToastsList from './ToastsList'
import SingleToast from './SingleToast'

class Toasts extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/admin/toasts/:id' component={SingleToast} />
        <Route exact path='/admin/toasts' component={ToastsList} />
      </Switch>
    )
  }
}

export default Toasts