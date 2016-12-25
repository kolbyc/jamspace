import { Mongo } from 'meteor/mongo';
import { } from 'meteor/meteor';

export const Jams = new Mongo.Collection('jams');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('jams', () => Jams.find());
}

export function jamDivs() {
  Meteor.subscribe('jams');

  let jamPosts;
  let temp;
  let post;
  let allJams = Jams.find().fetch();
  let div = document.createElement("div");

  for(let i = 0; i < allJams.length; i++) {
    temp = document.createElement("div");
    temp.className = "formDiv";
    post = document.createTextNode(allJams[i].jamInfo);
    temp.appendChild(post);
    div.appendChild(temp);
  }

  return {__html: div.innerHTML};

}
