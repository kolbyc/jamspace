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
    });
    this.setState({ value: '' });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Do you want to jam?<br/>
        Write a bit about yourself and what you want to do:<br/>
        <textarea type="text" value={this.state.value} placeholder="Information" onChange={this.handleChange}/>
        <br/><br/>
        <input type="submit" value="Post"/>
      </form>
    )
  }
}
