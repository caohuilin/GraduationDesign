/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';

import { IAppProps, IAppState } from '../constants/AppType';
import './style.less';

class App extends React.Component<IAppProps, IAppState> {
  render() {
    const { children } = this.props;
    return (
      <div className='app'>
        {children}
      </div>
    );
  }
}

export default App;
