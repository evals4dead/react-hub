import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import configure from './store/configure';
import routeConfig from './routeConfig';
import Router from './components/Router';

const serverRender = async ctx => {
  const accessToken = ctx.cookies.get('access_token');

  const store = configure();
  const promises = [];

  const { url, origin } = ctx;

  axios.defaults.baseURL = origin;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.cookie = `access_token=${accessToken}`;

  routeConfig.forEach(route => {
    const match = matchPath(url, route);
    if (!match) return;
    const { preload } = route;
    if (!preload) return;
    const { params } = match;

    const promise = preload(store, params);
    promises.push(promise);
  });

  let error = null;

  try {
    await Promise.all(promises);
  } catch (e) {
    error = e;
  }

  const context = {};

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <Router />
      </StaticRouter>
    </Provider>
  );

  if (context.isNotFound) {
    ctx.status = 404;
  }

  return {
    html,
    state: store.getState(),
    error,
  };
};

export default serverRender;
