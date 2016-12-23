import React, { Component } from 'react';
import { Link } from 'react-router';
import AccountsUiWrapper from '../AccountsUiWrapper/AccountsUiWrapper.jsx';
import './index.css';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/home" className="logoButton">JamSpace</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><div className="loginDiv"><AccountsUiWrapper /></div></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
