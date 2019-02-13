import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

const RootComponent = (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

ReactDOM.render(RootComponent, rootElement);

serviceWorker.unregister();
