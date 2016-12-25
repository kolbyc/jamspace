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
  let br = document.createElement("br");


  for(let i = 0; i < allJams.length; i++) {
    let name = Meteor.user().profile["first-name"] + " " + Meteor.user().profile["last-name"];
    temp = document.createElement("div");
    temp.className = "formDiv";
    let br = document.createElement("br");
    temp.appendChild(br);
    name = document.createTextNode(name);
    temp.appendChild(name);
    let br1 = document.createElement("br");
    temp.appendChild(br1);
    post = document.createTextNode(allJams[i].jamInfo);
    temp.appendChild(post);
    let br2 = document.createElement("br");
    temp.appendChild(br2);
    div.appendChild(temp);
    let br3 = document.createElement("br");
    div.appendChild(br3);
  }

  return {__html: div.innerHTML};

}
