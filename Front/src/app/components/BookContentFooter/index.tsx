import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import Brightness from '../Brightness';
import * as FontAction from '../../actions/font';
import { IAllState, IBookContentFooterProps, IBookContentFooterState } from '../../constants/ComponentsType';
import './style.less';

class BookContentFooter extends React.Component<IBookContentFooterProps, IBookContentFooterState> {
    render() {
        return (
            <Motion style={{x: spring(this.props.show ? 0 : 100)}}>
            {({x}) => {
                return(
                    <div className='book-content-footer' style={{transform: `translateY(${x}px) `}}>
                        <div>
                            <Brightness />
                        </div>
                        <div className='setFont'>
                            <button onClick={this.props.actions.setFontSize.bind(null, '+')}>A+</button>
                            <span>{this.props.fontSize}</span>
                            <button onClick={this.props.actions.setFontSize.bind(null, '-')}>A-</button>
                        </div>
                    </div>
                );}
            }
            </Motion>
        );
    }
}

function mapStateToProps(state: IAllState) {
  return {
      fontSize: state.font.get('fontSize'),
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
      actions: bindActionCreators(Object.assign({}, FontAction), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookContentFooter);
