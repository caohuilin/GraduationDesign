import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProgerssBar from '../ProgerssBar';
import * as BrightAction from '../../actions/bright';
import { IAllState, IBrightnessProps, IBrightnessState } from '../../constants/ComponentsType';
import './style.less';

class Brightness extends React.Component<IBrightnessProps, IBrightnessState> {
    render() {
        return (
            <div className='brightness'>
                <div className='progress'>
                    <i className='iconfont weui-tabbar__icon'>&#xe613;</i>
                    <ProgerssBar />
                    <i className='iconfont weui-tabbar__icon'>&#xe614;</i>
                </div>
                <button onClick={this.props.actions.setNightMode}>
                    {
                        this.props.night ? '白天' : '夜间'
                    }
                </button>
            </div>
        );
    }
}

function mapStateToProps(state: IAllState) {
  return {
      bright: state.bright.get('left'),
      night: state.bright.get('night'),
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
     actions: bindActionCreators(Object.assign({}, BrightAction), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Brightness);
