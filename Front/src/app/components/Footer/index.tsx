import  * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import  'weui/dist/style/weui.min.css';

import { IAllState, IFooterProps, IFooterState } from '../../constants/ComponentsType';
import './style.less';

class Footer extends React.Component<IFooterProps, IFooterState> {
  render() {
    const { routing } = this.props;
    const path = routing.locationBeforeTransitions.pathname;
    return (
      <div className='weui-tabbar'>
        <Link to='home' className={ path.startsWith('/home') || path === '/' ? 'weui-navbar__item weui-bar__item_on' : 'weui-navbar__item'}>
          <i className='iconfont weui-tabbar__icon'>&#xe605;</i>
          <p className='weui-tabbar__label'>书城</p>
        </Link>
        <Link to='collection' className={ path.startsWith('/collection') ? 'weui-navbar__item weui-bar__item_on' : 'weui-navbar__item' }>
          <i className='iconfont weui-tabbar__icon'>&#xe601;</i>
          <p className='weui-tabbar__label'>收藏</p>
        </Link>
        <Link to='user' className={path.startsWith('/user') ? 'weui-navbar__item weui-bar__item_on' : 'weui-navbar__item'}>
          <i className='iconfont weui-tabbar__icon'>&#xe600;</i>
          <p className='weui-tabbar__label'>我</p>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state: IAllState) {
  return {
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
