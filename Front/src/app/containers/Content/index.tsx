import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HomeAction from '../../actions/home';
import BookContent from '../../components/BookContent';
import BookContentHeader from '../../components/BookContentHeader';
import BookContentFooter from '../../components/BookContentFooter';
import Share from '../../components/Share';

import { IAllState, IContentProps, IContentState } from '../../constants/AppType';
import './style.less';

class Content extends React.Component<IContentProps, IContentState> {
  constructor(props: IContentProps) {
    super(props);
    this.state = {
      showHeaderAndFooter: false,
      showShare: false
    };
    this.setHeaderAndFooterShow = this.setHeaderAndFooterShow.bind(this);
    this.setShareShow = this.setShareShow.bind(this);
  }
  setHeaderAndFooterShow() {
    if (this.state.showShare) {
      this.setState({showShare: false});
    } else {
      this.setState({showHeaderAndFooter: !this.state.showHeaderAndFooter});
    }
  }
  setShareShow() {
    this.setState({showShare: true, showHeaderAndFooter: false});
  }
  render() {
    const { showHeaderAndFooter, showShare } = this.state;
    return (
      <div className='book-content-out'>
        <BookContentHeader show={showHeaderAndFooter} setShareShow={this.setShareShow} bookId={this.props.bookId}/>
        <BookContent worked={!showHeaderAndFooter} setWorked={this.setHeaderAndFooterShow} bookId={this.props.bookId} menuId={this.props.menuId}/>
        <BookContentFooter show={showHeaderAndFooter} />
        <Share showShare={showShare}/>
      </div>
    );
  }

  componentDidMount() {
    const { HomeActions, bookId, menuId } = this.props;
    HomeActions.getBookInfo(bookId);
    HomeActions.getContent({bookId: bookId, menuId: menuId});
  }
}

function mapStateToProps(state: IAllState, ownProps: any) {
  return {
    bookId: ownProps.params.id[0],
    menuId: ownProps.params.id[1],
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
)(Content);
