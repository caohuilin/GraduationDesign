import * as React from 'react';
import 'loaders.css/loaders.min.css';
import './style.less';

class Loading extends React.Component<any, any> {
  render() {
    return (
      <div className='loader-inner line-scale-party'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Loading;
