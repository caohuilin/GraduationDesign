import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { IAllState, IBookListProps, IBookListState } from '../../constants/ComponentsType';
import './style.less';

class BookList extends React.Component<IBookListProps, IBookListState> {
  renderBookList () {
    const { allbooklist } = this.props;
    return (
      <ul className='books'>
        {allbooklist.map((book) => {
          return(
            <Link key={book.id} to={'home/book/' + book.id} className='item'>
              <img src={book.picture} className='picture'/>
              <div className='info'>
                <div className='title'>{book.name}</div>
                <div className='author'>{book.author}</div>
                <div className='introduce'>{book.description}</div>
              </div>
            </Link>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div className='book-list'>
        {this.renderBookList()}
      </div>
    );
  }
}

function mapStateToProps(state: IAllState) {
  return {
    allbooklist: state.allbooklist.get('list')
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList);
