import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Motion, spring } from 'react-motion';
import Header from '../../components/Header';
import LoginForm from '../../components/Form/LoginForm';
import RegisterForm from '../../components/Form/RegisterForm';
import { IAllState } from '../../constants/ComponentsType';
import 'weui/dist/style/weui.min.css';
import './style.less';

const weChatImg = './app/resources/images/wechat.png';
const qqImg = './app/resources/images/qq.png';
const weiboImg = './app/resources/images/weibo.png';

class LoginRegister extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      translate: 150
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ translate: 0 });
  }

  handleClick() {
    this.setState({ translate: 150 });
    const that = this;
    setTimeout(function () {
      that.setState({ translate: 0 });
    }, 300);
  }
  render() {
    const { routing } = this.props;
    const path = routing.locationBeforeTransitions.pathname;
    const isLogin = path.startsWith('/login') ? true : false;
    return (
      <div className='app'>
        <Header />
        <div className='loginregister'>
          <Link className='back' to='/'><i className='iconfont weui-tabbar__icon'>&#xe68c;</i></Link>
          <Motion style={{ x: spring(this.state.translate) }}>
            {
              ({ x }) => {
                return (
                  <div className='popup' style={{ transform: `translate3d(0, ${x}%, 0)` }}>
                    <header>{isLogin ? '登录' : '注册'}</header>
                    <div className='form'>
                      {isLogin ? <LoginForm /> : <RegisterForm handleClick={this.handleClick} />}
                    </div>
                    <div className='otherLogin'>
                      <span>社交账号直接登录</span>
                      <div className='icon'>
                        <img src={weChatImg} alt='wechat' />
                        <img src={qqImg} alt='qq' />
                        <img src={weiboImg} alt='weibo' />
                      </div>
                    </div>
                    {isLogin && <Link onClick={this.handleClick} to='/register' className='registerButton'>还没有账户，马上注册</Link>}
                  </div>
                );
              }
            }
          </Motion>
        </div>
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
)(LoginRegister);
