import { Mongo } from 'meteor/mongo';
import { } from 'meteor/meteor';

export const Jams = new Mongo.Collection('jams');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('jams', () => Jams.find());
}
