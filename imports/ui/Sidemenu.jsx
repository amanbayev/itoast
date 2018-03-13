import React from 'react'
import { NavLink } from 'react-router-dom'

export default Sidemenu = props => (
  <nav id="sidebar" className="col-md-2 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky">
      <ul className="nav flex-column">
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
      </ul>
    </div>
  </nav>
)