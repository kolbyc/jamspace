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
    let name = Meteor.user().profile["first-name"] + " " + Meteor.user().profile["last-name"];

    let allJams = Jams.find({}, {sort: {date: -1}}).fetch();
    let groups = [];

    for(let i = 0; i < allJams.length; i++) {
      groups.push(<div> <div className="postDiv"> <br /> {name} <br /> {allJams[i].jamInfo} <br /> </div> <br /> </div>);
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
