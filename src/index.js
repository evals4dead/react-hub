import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Router from './components/Router';
import configure from 'store/configure';
import routeConfig from './routeConfig';
import './styles/base.scss';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

const store = configure(typeof window !== 'undefined' && window.__PRELOADED_STATE__);

const RootComponent = (
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);

const render = async () => {
  if (process.env.NODE_ENV === 'development') {
    return ReactDOM.render(RootComponent, rootElement);
  }

  const getComponents = [];
  const { pathname } = window.location;

  routeConfig.forEach(route => {
    const match = matchPath(pathname, route);
    if (!match) return;
    const { getComponent } = route.component;
    if (!getComponent) return;
    getComponents.push(getComponent());
  });

  await Promise.all(getComponents);
  ReactDOM.hydrate(RootComponent, rootElement);
};

render();

serviceWorker.unregister();
