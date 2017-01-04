import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    function findName(id) {
      let users = Meteor.users.find().fetch();

      for(let i = 0; i < users.length; i++) {
        if(users[i]._id === id) {
          name = users[i].profile["first-name"] + " " + users[i].profile["last-name"];
          return name
        }
      }
    }

    return (
      <div className="homeDiv">
        <h1>{findName(this.props.location.query.user)}</h1>
      </div>
    )
  }
}
