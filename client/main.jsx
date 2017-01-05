import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
import Splash from '../imports/ui/Splash/splash.jsx';
import Home from '../imports/ui/Home/home.jsx';
import AppFrame from '../imports/ui/AppFrame/appFrame.jsx';
import Profile from '../imports/ui/Profile/profile.jsx';


// if the user is not logged in, redirect them to the splash page
function requireAuth(nextState, replace) {
  if (!Meteor.user()) {
    replace({
      pathname: '/splash',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

Meteor.startup(() => {
  render(
      <Router history={browserHistory}>
        <Route path="/" component={AppFrame}>
          <IndexRedirect to="splash" />
          <Route path="splash" component={Splash} />
          <Route path="home" component={Home} onEnter={requireAuth} />
          <Route path="profile/*" component={Profile} onEnter={requireAuth} />
          <Route path="*" component={Splash} />
        </Route>
      </Router>,
      document.getElementById('render-target'),
    );
});
