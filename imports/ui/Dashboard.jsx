import React, { Component } from 'react'
import { Link, NavLink, Switch, Route } from 'react-router-dom'

import Empty from './Empty'
import Toasts from './Toasts'
import Sidemenu from './Sidemenu'
import Categories from './Categories'
import Types from './Types'

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
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/admin">
                  <i className="fa fa-dashboard"></i>
                  &nbsp;Главная 
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/admin/types">
                  <i className="fa fa-bars"></i>
                  &nbsp;Типы
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/admin/categories">
                  <i className="fa fa-gears"></i>
                  &nbsp;Категории
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/admin/toasts">
                  <i className="fa fa-book"></i>
                  &nbsp;Записи
                </NavLink>
              </li>
              <li className="nav-item text-nowrap">
                <Link onClick={this.logout.bind(this)} className="nav-link" to="/login">Выйти</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-md ml-sm-auto pt-3 p-4">
              <Switch>
                <Route 
                  path='/admin/toasts' 
                  component={Toasts} 
                />
                <Route
                  path='/admin/types'
                  component={Types}
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