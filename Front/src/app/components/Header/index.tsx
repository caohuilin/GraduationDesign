import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import 'weui/dist/style/weui.min.css';
import * as AuthAction from '../../actions/auth';
import { IAllState, IHeaderProps, IHeaderState } from '../../constants/ComponentsType';
import './style.less';

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.loginOut = this.loginOut.bind(this);
  }
  componentDidMount() {
    if (cookie.load('bookmanage_jwt')) {
      this.props.AuthActions.getUserInfo();
    }
  }
  loginOut() {
    cookie.remove('bookmanage_jwt');
    this.props.AuthActions.deleteUserInfo();
  }
  render() {
    const { account, routing } = this.props;
    const pathname = routing.locationBeforeTransitions.pathname;
    return (
      <div className='header'>
        <div className='container'>
          <Link className='logo' to='/'>
            <i className='iconfont weui-tabbar__icon'>&#xe60a;</i>
            <p>书海</p>
          </Link>
          <div className='loginButton'>
            {account.get('data') ?
              (pathname === '/user' ? <a onClick={this.loginOut}>退出</a> : <Link to='/user'>{account.get('data').nickname}</Link>)
              :
              <Link to='/login'>登录</Link>}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IAllState) {
  return {
    routing: state.routing,
    account: state.account
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    AuthActions: bindActionCreators(Object.assign({}, AuthAction), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
