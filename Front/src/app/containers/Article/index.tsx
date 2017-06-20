import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as HomeAction from '../../actions/home';
import * as BookContentAction from '../../actions/bookcontent';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RemindPopup from '../../components/RemindPopup';

import { IAllState, IArticleProps, IArticleState } from '../../constants/AppType';
import './style.less';

class Article extends React.Component<IArticleProps, IArticleState> {
  constructor(props: IArticleProps, context: any) {
    super(props);
    this.state = {
      showAll: false,
      showRemind: false,
    };
    this.allcategoryShow = this.allcategoryShow.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
  }

  allcategoryShow() {
    this.setState({showAll: !this.state.showAll});
  }

  handlePopup() {
    this.setState({showRemind: false});
  }

  renderMenu() {
    const { bookinfo, id } = this.props;
    const menu = bookinfo.get('catalog');
    const number = this.state.showAll ? menu.size : 15;
    return(
      <ul className = 'menu-list'>
        {
          menu ? menu.slice(0, number).map((item) => {
            return <li key={item.id}><Link to={'/home/book/' + id + '/content/' + item.id}>{ item.chapter }</Link></li>;
          }) : null
        }
        <li onClick={this.allcategoryShow} style={{display:this.state.showAll ? 'none' : 'block'}}>
          <a className='more'><i className='iconfont weui-tabbar__icon'>&#xe608;</i></a>
        </li>
        <li onClick={this.allcategoryShow} style={{display:this.state.showAll ? 'block' : 'none'}}>
          <a className='less'><i className='iconfont weui-tabbar__icon'>&#xe607;</i></a>
        </li>
      </ul>
    );
  }

  componentWillReceiveProps(nextProps: IArticleProps) {
    const next = nextProps.userstatus.get('data') ? nextProps.userstatus.get('data').get('book_id') : null;
    if ((!this.props.userstatus.get('data') || this.props.userstatus.get('data').get('book_id') !== String(next)) && String(next) === this.props.id) {
      this.setState({ showRemind: true });
    } else {
      this.setState({ showRemind: false });
    }
  }

  render() {
    const { bookinfo, id, userstatus } = this.props;
    const menuId = userstatus.get('data') ? userstatus.get('data').get('menu_id') : null;
    return (
      <div className='app'>
        <Header />
        <div className='article'>
          <div className='book-info'>
            <div className='book-picture'>
              <img src={bookinfo.get('picture')}/>
            </div>
            <h1>{bookinfo.get('name')}</h1>
            <div className='book-author'>作者: {bookinfo.get('author')}</div>
            <div className='book-tag'>类型: {bookinfo.get('category')}</div>
            <button><Link to={'/home/book/' + id + '/content/1'}>去读</Link></button>
          </div>
          <div className='book-introduce'>
            <h2><i className='iconfont weui-tabbar__icon'>&#xe603;</i>简介</h2>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bookinfo.get('description')}</p>
          </div>
          <div className='book-menu'>
            <h2><i className='iconfont weui-tabbar__icon menu'>&#xe606;</i>目录</h2>
            {this.renderMenu()}
          </div>
        </div>
        {this.state.showRemind && <RemindPopup menuId={menuId} bookId={id} handleClick={this.handlePopup} />}
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    const { actions, id } = this.props;
    actions.getBookInfo(id);
    actions.getUserStatus(id);
  }
}

function mapStateToProps(state: IAllState, ownProps: any) {
  return {
    bookinfo: state.bookinfo.get('content'),
    id: ownProps.params.id,
    userstatus: state.userstatus,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(Object.assign({}, HomeAction, BookContentAction), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
