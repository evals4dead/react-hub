import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Router from './components/Router';
import configure from 'store/configure';
import './styles/base.scss';
import * as serviceWorker from './serviceWorker';


const rootElement = document.getElementById('root');

const store = configure();

const RootComponent = (
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(RootComponent, rootElement);

serviceWorker.unregister();
