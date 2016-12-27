import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Jams } from '../../api/JamsDbCollection.js'

export default class JamForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
        value: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    Jams.insert({
      user: Meteor.user(),
      jamInfo: this.state.value,
      date: new Date(),
    });
    this.setState({ value: '' });
    event.preventDefault();
  }

  render() {
    Meteor.subscribe('jams');

    let allJams = Jams.find({}, {sort: {date: -1}}).fetch();
    let name;
    let groups = [];
    let distance;

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      let R = 6371; // Radius of the earth in km
      let dLat = deg2rad(lat2-lat1);  // deg2rad below
      let dLon = deg2rad(lon2-lon1);
      let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    for(let i = 0; i < allJams.length; i++) {
      distance = getDistanceFromLatLonInKm(Meteor.user().profile["location"].latitude, Meteor.user().profile["location"].longitude,
        allJams[i].user.profile["location"].latitude, allJams[i].user.profile["location"].longitude);
      if(distance <= 10) {
        name = allJams[i].user.profile["first-name"] + " " + allJams[i].user.profile["last-name"];
        groups.push(<div> <div className="postDiv"> <br /> {name} <br /> {allJams[i].jamInfo} <br /> </div> <br /> </div>);
      }
    }

    return (
      <div>
        <div className="formDiv">
          <form onSubmit={this.handleSubmit}>
            Do you want to jam?<br/>
            Write a bit about yourself and what you want to do:<br/>
            <textarea type="text" value={this.state.value} placeholder="Information" onChange={this.handleChange}/>
            <br/><br/>
            <input type="submit" value="Post"/>
          </form>
        </div>
        <br />
        <div>
          {groups}
        </div>
      </div>
    )
  }
}
