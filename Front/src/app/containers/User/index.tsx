import * as React from 'react';
import { connect } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Link } from 'react-router';
import './style.less';
import { IAllState, IUserProps, IUserState } from '../../constants/AppType';

class User extends React.Component<IUserProps, IUserState> {
  render() {
    const account = this.props.account.get('data');
    return (
      <div className='app'>
        <Header />
        <div className='user'>
          <header>
            <div className='nickName'>
              <div className='name'>
                <i className='iconfont weui-tabbar__icon picture'>&#xe74c;</i>
                {account ?
                  <span>{account.nickname}</span>
                  :
                  <Link to='/login'>去登录</Link>
                }
              </div>
              <i className='iconfont weui-tabbar__icon level'>&#xe62d;</i>
            </div>
            <ul className='status'>
              <li>
                <div className='time'>{account ? 100 : '?'} 分钟</div>
                <div className='des'>今日读</div>
              </li>
              <li>
                <div className='time'>{account ? 365 : '?'} 小时</div>
                <div className='des'>累计读</div>
              </li>
              <li>
                <div className='time'>{account ? 300 : '?'} 本</div>
                <div className='des'>读过</div>
              </li>
            </ul>
          </header>
          {account &&
            <section>
              <div className='title'>喜欢的阅读类型</div>
              <ul>
                <li>计算机与互联网</li>
                <li>青春</li>
                <li>设计</li>
                <li>杂志</li>
                <li>心理学</li>
                <li>文艺</li>
                <li>小说</li>
              </ul>
            </section>}
          {account &&
            <section>
              <div className='title'>喜欢的作者</div>
              <ul>
                <li>贾平凹</li>
                <li>朱自清</li>
                <li>郭敬明</li>
                <li>韩寒</li>
                <li>余秋雨</li>
                <li>莫言</li>
              </ul>
            </section>}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: IAllState) {
  return {
    account: state.account,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
