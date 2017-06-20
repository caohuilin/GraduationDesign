import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import { bindActionCreators } from 'redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import { IAllState, ICollectionProps, ICollectionState } from '../../constants/AppType';

import './style.less';

import * as CollectAction from '../../actions/collect';

const MyCollection = ({ collect, recommend }) => {
  return (
    <div className='collection'>
      <section className='my_collection'>
        <ul>
          {
            collect.get('list').map((item, i) => {
              return (
                <li key={i}>
                  <Link to={`/home/book/${item.id}`}>
                    <img src={item.picture} />
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </section>
      <section className='my_collection'>
        <h3>根据您的兴趣推荐</h3>
        <ul>
          {
            recommend.get('list').map((item, i) => {
              return (
                <li key={i}>
                  <Link to={`/home/book/${item.id}`}>
                    <img src={item.picture} />
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </section>
    </div>
  );
};

const FailLogin = () => {
  return (
    <div className='collection'>
      <div className='login_fail'>
        <i className='iconfont weui-tabbar__icon'>&#xe63a;</i>
        <span>好像忘记登陆了</span>
      </div>
    </div>
  );
};
class Collection extends React.Component<ICollectionProps, ICollectionState> {
  componentDidMount() {
    if (cookie.load('bookmanage_jwt')) {
      this.props.CollectActions.getCollectBooks();
      this.props.CollectActions.getRecommendBooks();
    }
  }
  render() {
    const { account, collect, recommend } = this.props;
    return (
      <div className='app'>
        <Header />
        {
          account.get('data') ? <MyCollection collect={collect} recommend={recommend} /> : <FailLogin />
        }
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: IAllState) {
  return {
    collect: state.collect,
    account: state.account,
    recommend: state.recommend
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    CollectActions: bindActionCreators(Object.assign({}, CollectAction), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);
