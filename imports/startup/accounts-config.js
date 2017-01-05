import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'first-name',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'last-name',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
    }]
});

function createURL() {
  let urlName = Meteor.user().profile["urlName"];
  let urlNumber = Meteor.user().profile["urlNumber"];
  let allUsers = Meteor.users.find().fetch();
  let returnUrl;

  for(let i = 0; i < allUsers.length; i++) {
    let loop = true;
    while(loop) {
      if(allUsers[i].profile["urlName"] === urlName && allUsers[i]._id != Meteor.userId()) {
        if(allUsers[i].profile["urlNumber"] == urlNumber){
          urlNumber++;
        }
        else{
          returnUrl = urlName + urlNumber.toString();
          loop = false;
        }
      }
      else{
        returnUrl = urlName + urlNumber.toString();
        loop = false;
      }
    }
  }
  return returnUrl;
}

Accounts.onLogin(function(user){
  Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.location': UserLocation.get()}});

  if(Meteor.user().profile["url"] === undefined) {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.name': Meteor.user().profile["first-name"]}});
    let name = Meteor.user().profile["first-name"] + "." + Meteor.user().profile["last-name"];
    let num = 1;
    Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.urlName': name}});
    Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.urlNumber': num}});
    let url = createURL();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.url': url}});
  }
});
