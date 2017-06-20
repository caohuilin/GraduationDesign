import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HomeAction from '../../actions/home';
import './style.less';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RemindPopup from '../../components/RemindPopup';
import Search from '../../components/SearchInput';
import CategoryList from '../../components/CategoryList';
import BookList from '../../components/BookList';
import Loading from '../../components/Loading';

import { IAllState, IHomeProps, IHomeState } from '../../constants/AppType';

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      showRemind: false,
    };
    this.handlePopup = this.handlePopup.bind(this);
  }

  handlePopup() {
    this.setState({ showRemind: false });
  }
  renderBookList() {
    const { allbooklist } = this.props;
    if (allbooklist.size > 0) {
      return (
        <BookList />
      );
    } else {
      return (
        <Loading />
      );
    }
  }

  componentWillReceiveProps(nextProps: IHomeProps) {
    if (!nextProps.account.get('data')) {
      return;
    }
    if (!nextProps.account.get('data').current) {
      return;
    }
    const { account } = nextProps;
    const current = account.get('data') ? account.get('data').current ? account.get('data').current : null : null;
    const oldAccount = this.props.account;
    const oldCurrent = oldAccount.get('data') ? oldAccount.get('data').current ? oldAccount.get('data').current : null : null;
    if (current && !oldCurrent) {
      this.setState({ showRemind: true});
    } else {
      this.setState({ showRemind: false});
    }
  }
  render() {
    const { account } = this.props;
    const current = account.get('data') ? account.get('data').current ? account.get('data').current : null : null;
    const bookId = current ? current.book_id : null;
    const menuId = current ? current.menu_id : null;
    return (
      <div className='app'>
        <Header />
        <div className='home'>
          <Search />
          <div className='content'>
            <CategoryList />
            {this.renderBookList()}
          </div>
        </div>
        {this.state.showRemind && 
        <RemindPopup menuId={menuId} bookId={bookId} handleClick={this.handlePopup} />}
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    const { HomeActions, id } = this.props;
    HomeActions.getCategortyList();
    HomeActions.getCategoryBookList(id);
  }
}

function mapStateToProps(state: IAllState, ownProps: any) {
  return {
    allbooklist: state.allbooklist.get('list'),
    id: ownProps.params.id,
    account: state.account
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    HomeActions: bindActionCreators(Object.assign({}, HomeAction), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
