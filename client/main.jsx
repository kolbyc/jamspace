import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Splash from '../imports/ui/splash.jsx';

Meteor.startup(() => {
  render(<Splash />, document.getElementById('render-target'));
});
