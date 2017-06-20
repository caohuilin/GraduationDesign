import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as HomeAction from '../../actions/home';
import { IAllState, ICategoryListProps, ICategoryListState } from '../../constants/ComponentsType';
import './style.less';

class CategoryList extends React.Component<ICategoryListProps, ICategoryListState> {
  constructor(props: ICategoryListProps, context: any) {
    super(props, context);
    this.state = {
      id: '93',
      showAll: false,
    };
    this.setId = this.setId.bind(this);
    this.allcategoryShow = this.allcategoryShow.bind(this);
  }

  setId(id: any) {
    const { HomeActions } = this.props;
    HomeActions.ClearBookList();
    HomeActions.getCategoryBookList(id);
    this.setState({ id: id, showAll: this.state.showAll });
  }

  allcategoryShow() {
    this.setState({ id: this.state.id, showAll: !this.state.showAll });
  }

  renderCategoryList() {
    const { allcategory } = this.props;
    const number = this.state.showAll ? allcategory.size : 7;
    return (
      <ul>
        { allcategory.slice(0, number).map((item) => {
            return (
              <li key={item.id} >
                <Link to={'/home/' + item.id} className={this.state.id === item.id ? 'tagActive' : ''} onClick={this.setId.bind(null, item.id)}>
                  {item.category}
                </Link>
              </li>
            );
          })
        }
        <li onClick={this.allcategoryShow} style={{display:this.state.showAll ? 'none' : 'block'}}>
          <i className='iconfont weui-tabbar__icon'>&#xe602;</i>
        </li>
        <li className='pack' onClick={this.allcategoryShow} style={{display:this.state.showAll ? 'block' : 'none'}}>
          <i className='iconfont weui-tabbar__icon'>&#xe604;</i>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className='category'>
        {this.renderCategoryList()}
      </div>
    );
  }
}

function mapStateToProps(state: IAllState) {
  return {
    allbooklist: state.allbooklist.get('list'),
    allcategory: state.allcategory.get('list'),
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
)(CategoryList);
