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

if(Meteor.isServer){
  Accounts.onCreateUser(function(options, user) {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.url': "test"}});
  });
}

Accounts.onLogin(function(user){
  Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.location': UserLocation.get()}});
});
