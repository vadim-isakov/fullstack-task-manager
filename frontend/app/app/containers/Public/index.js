import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Confirm from './Confirm';

export default function AuthRouter() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/confirm/:token" component={Confirm} />
      <Redirect to="/" />
    </Switch>
  );
}
