import React from 'react'
import { NavLink } from 'react-router-dom'

export default Sidemenu = props => (
  <nav className="col-md-2 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/admin">
            <i className="fa fa-dashboard"></i>
            &nbsp;Dashboard 
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/admin/categories">
            <i className="fa fa-gears"></i>
            &nbsp;Categories
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/admin/toasts">
            <i className="fa fa-book"></i>
            &nbsp;Toasts
          </NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fa fa-users"></i>
            &nbsp;Users
          </a>
        </li>
      </ul>
    </div>
  </nav>
)