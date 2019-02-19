import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage, UserPage, RepoPage, NotFoundPage } from 'pages';
import Base from 'containers/Base';

class Router extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/notfound" component={NotFoundPage} />
          <Route exact={true} path="/@:username" component={UserPage} />
          <Route exact={true} path="/@:username/:reponame" component={RepoPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Base />
      </>
    );
  }
}

export default Router;
