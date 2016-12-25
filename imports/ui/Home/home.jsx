import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import JamForm from '../Forms/jamForm.jsx'

export default class Home extends Component {
  render() {
    Meteor.subscribe('jams');
    return (
      <div className="homeDiv">
        <h1>Welcome, {Meteor.user().profile["first-name"]}</h1>
        <ul className="nav nav-pills">
          <li className="active"><a data-toggle="pill" href="#connections">Connections</a></li>
          <li><a data-toggle="pill" href="#jam">Who Wants to Jam?</a></li>
          <li><a data-toggle="pill" href="#members">Looking for Members/Collaborators</a></li>
          <li><a data-toggle="pill" href="#sell">For Sale/Rent</a></li>
        </ul>
        <div className="tab-content">
          <div id="connections" className="tab-pane fade in active">
            <h3>CONNECTIONS</h3>
            <p>Here you would see news from you connections. (Under Development)</p>
          </div>
          <div id="jam" className="tab-pane fade">
            <br />
            <h3>WHO WANTS TO JAM?</h3>
            <p>Here you would see the people in your area that want to get together and jam. (Under Development)</p>
            <br />
              <JamForm />
            <br />
          </div>
          <div id="members" className="tab-pane fade">
            <h3>LOOKING FOR MEMBERS/COLLABORATORS</h3>
            <p>Here you would find people in your area who are looking for band members or collaborators to work with. (Under Development)</p>
          </div>
          <div id="sell" className="tab-pane fade">
            <h3>FOR SALE/RENT</h3>
            <p>Here you would see instruments for sale/rent and possibly studio time to rent. (Under Development)</p>
          </div>
        </div>
      </div>
    )
  }
}
