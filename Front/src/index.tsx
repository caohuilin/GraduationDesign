/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './router';
import { AppContainer } from 'react-hot-loader';

declare var module: any;
declare var require: any;

const root = document.getElementById('root');

ReactDOM.render((
  <AppContainer>
    <App />
  </AppContainer>
), root);

if (module.hot) {
  module.hot.accept('./router', () => {
    const App = require('./router').default;
    ReactDOM.render((
      <AppContainer>
        <App />
      </AppContainer>
    ), root);
  });
}
