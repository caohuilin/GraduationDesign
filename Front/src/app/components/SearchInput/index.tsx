import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as HomeAction from '../../actions/home';
import { IAllState, ISearchProps, ISearchState } from '../../constants/ComponentsType';
import './style.less';

class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps, context: any) {
    super(props, context);
    this.state = {
      search: false,
      input: false
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleBlur() {
    this.setState({ search: false });
  }

  handleFocus() {
    this.setState({ search: true });
  }

  handleInput(e: any) {
    if (e.target.value) {
      this.setState({ input: true });
      this.props.HomeActions.searchBooks(e.target.value);
    } else {
      this.setState({ input: false });
    }
  }

  render() {
    return (
      <div className='search'>
        <div className={this.state.search ? 'weui-search-bar weui-search-bar_focusing' : 'weui-search-bar'} id='search_bar'>
          <form className='weui-search-bar__form'>
            <div className='weui-search-bar__box'>
              <i className='weui-icon-search'></i>
              <input
                type='search'
                className='weui-search-bar__input'
                id='search_input' placeholder='搜索'
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onInput={this.handleInput}
              />
              <a href='javascript:' className='weui-icon-clear' id='search_clear'></a>
            </div>
            <label htmlFor='search_input' className='weui-search-bar__label' id='search_text'>
              <i className='weui-icon-search'></i>
              <span>搜索</span>
            </label>
          </form>
          <a href='javascript:' className='weui-search-bar__cancel-btn' id='search_cancel'>取消</a>
        </div>
        <div className={this.state.input ? 'weui-cells weui-cells_access search_result_list search_show show' : 'weui-cells weui-cells_access search_result_list search_show hide'} id='search_show'>
          {
            this.props.search.get('list').map((item, i) => {
              if (i < 5) {
                return (
                  <div className='weui-cell' key={i}>
                    <div className='weui-cell__bd weui-cell_primary'>
                      <Link to={`home/book/${item.id}`}>{item.name}</Link>
                    </div>
                  </div>
                );
              }
              return null;
            })
          }

        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IAllState) {
  return {
    search: state.search,
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
)(Search);
