import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage, MyPage, NotFoundPage } from 'pages';

class Router extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/mypage" component={MyPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    );
  }
}

export default Router;
