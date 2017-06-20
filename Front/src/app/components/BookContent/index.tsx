import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';

import BookItem from './BookItem';
import FlipAnimation from '../FlipAnimation';
import Battery from '../Battery';

import * as bookContentAction from '../../actions/bookcontent';
import { IAllState, IBookContentProps, IBookContentState } from '../../constants/ComponentsType';
import './style.less';

class BookContent extends React.Component<IBookContentProps, IBookContentState> {
    constructor(props: IBookContentProps) {
      super(props);
      this.state = {
        currentPage: 0,
        offsetWrapLength: 0
      };
      this.prevPage = this.prevPage.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.setOffset = this.setOffset.bind(this);
    }

    componentWillReceiveProps(nextProps: IBookContentProps) {
      const { page } = this.props;
      if (nextProps.page !== this.props.page) {
        const rate = page ? (this.state.currentPage / page).toFixed(2) : 0;
        this.setState({ currentPage: nextProps.page * +rate });
      }
    }

    prevPage() {
      const { bookId, menuId } = this.props;
      const { currentPage } = this.state;
      this.setState({ currentPage: currentPage === 0 ? 0 : currentPage - 1 });
      this.props.actions.saveUserStatus({book_id: bookId, menu_id: menuId, page: currentPage === 0 ? 0 : currentPage - 1});
    }

    nextPage() {
      const { page, bookId, menuId } = this.props;
      const { currentPage } = this.state;
      this.setState({ currentPage: currentPage === page ? page : currentPage + 1 });
      this.props.actions.saveUserStatus({book_id: Number(bookId), menu_id: Number(menuId), page: currentPage === page ? page : currentPage + 1});
    }

    getOffsetContentWidth(i: number) {
      const { everyWidth } = this.props;
      const { currentPage, offsetWrapLength } = this.state;
      switch (i - currentPage) {
        case -1:
          if (offsetWrapLength > 0) {
            return (i - currentPage) * everyWidth + offsetWrapLength;
          }
          return (i - currentPage) * everyWidth;
        case 0:
          if (offsetWrapLength < 0) {
            return (i - currentPage) * everyWidth + offsetWrapLength;
          }
          return (i - currentPage) * everyWidth;
        case 1:
          return (i - currentPage - 1) * everyWidth;
        default:
          return (i - currentPage) * everyWidth;
      }
    }

    setOffset(offset: number) {
        this.setState({offsetWrapLength: offset});
    }

    render() {
        const { everyWidth, page, worked, setWorked, bookInfo, menuId } = this.props;
        const { currentPage } = this.state;
        const showPage = page === 0 ? [1] : Array.apply(null, Array(page + 1));
        const rate = page ? currentPage / page : 0;
        return (
          <FlipAnimation setOffset={this.setOffset} nextPage={this.nextPage} prevPage={this.prevPage} worked={worked} setWorked={setWorked}>
            <div className='page-header'>{ bookInfo.get('content').size > 0 ? bookInfo.get('content').get('catalog')[menuId - 1].chapter : '' }</div>
            {
              showPage.map((item, i) => {
                if (Math.abs(i - currentPage) <= 1) {
                    const offsetContentWidth = this.getOffsetContentWidth(i);
                    const offsetWrapWidth = i * (everyWidth - 30);
                    return (
                      <Motion key={i} style={{ x: spring(offsetContentWidth), y: offsetWrapWidth}}>
                        {({ x, y }) => {
                            return (
                              <BookItem i={page - i} x={x} y={y} />
                          );
                          }
                        }
                      </Motion>
                    );
                }
              })
            }
            <div className='page-footer'>
              <div className='page-footer-content'>
                <div className='rate'>{ (rate * 100).toFixed(0) }%</div>
                <Battery />
              </div>
            </div>
          </FlipAnimation>
        );
    }
}

function mapStateToProps(state: IAllState, ownProps: any) {
  return {
    everyWidth: state.content.get('everyWidth'),
    page: state.content.get('page'),
    content: state.content.get('content'),
    bookInfo: state.bookinfo,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(Object.assign({}, bookContentAction), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookContent);
