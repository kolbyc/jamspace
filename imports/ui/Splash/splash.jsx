import React, { Component } from 'react';
import Navbar from '../Navbar/navbar.jsx';

export default class Splash extends Component {
  render() {
    return (
      <header className="intro">
        <div className="intro-body">
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h1 className="brand-heading">JamSpace</h1>
                    <p className="intro-text"> Connect with musicians </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
