import React, { Component } from 'react'
import { Link, NavLink, Switch, Route } from 'react-router-dom'

import Empty from './Empty'
import Toasts from './Toasts'
import Sidemenu from './Sidemenu'
import Categories from './Categories'

class Dashboard extends Component {
  constructor(props){
    super(props)
  }

  logout(e) {
    e.preventDefault()
    console.log('got here')
    Meteor.logout()
    this.props.history.push('/login')
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">iToast</a>
          <input className="form-control form-control-dark w-100" type="text" placeholder="Поиск пока не работает" aria-label="Search" />
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <Link onClick={this.logout.bind(this)} className="nav-link" to="/login">Выйти</Link>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <Sidemenu />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <Switch>
                <Route 
                  path='/admin/toasts' 
                  component={Toasts} 
                />
                <Route path='/admin/categories' component={Categories} />
                <Route component={Empty} />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard