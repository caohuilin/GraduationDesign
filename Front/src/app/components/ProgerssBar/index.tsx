import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import  'weui/dist/style/weui.min.css';
import * as BrightAction from '../../actions/bright';
import { IAllState, IPoint, IProgressBarProps, IProgressBarState } from '../../constants/ComponentsType';
import './style.less';

class ProgerssBar extends React.Component<IProgressBarProps, IProgressBarState> {
    pointStart= { x: 0, y: 0 };
    pointCurrent = { x: 0, y: 0 };
    pointLast= { x: 0, y: 0 };
    constructor(props: IProgressBarProps) {
        super(props);
        this.startEvHandle = this.startEvHandle.bind(this);
        this.moveEvtHandler = this.moveEvtHandler.bind(this);
        this.endEvtHandler = this.endEvtHandler.bind(this);
        this.getLeft = this.getLeft.bind(this);
    }
    // 获取touch的点
    getTouchPos(e: any): IPoint {
      const touches = e.touches;
      return { x: touches[0].clientX, y: touches[0].clientY };
    }
    // 计算两点之间的水平距离
    getDistX(p1: IPoint, p2: IPoint): number {
      return Math.abs(p1.x - p2.x);
    }
        // 计算两点之间所成角度
    getAngle(p1: IPoint, p2: IPoint): number {
      const r = Math.atan2(p1.y - p2.y, p2.x - p1.x);
      const a = r * 180 / Math.PI;
      return a;
    }
    // 获取移动的方向
    getSwipDir(p1: IPoint, p2: IPoint): string {
      const angle = this.getAngle(p1, p2);
      if (angle >= 45 && angle < 135) {
         return 'up';
      }
      if (angle >= -135 && angle <= -45) {
        return 'down';
      }
      if (angle >= 135 || angle < -135) {
        return 'left';
      }
      if (angle < 45 && angle > -45) {
        return 'right';
      }
    }
    startEvHandle(e: any) {
        this.pointStart = this.getTouchPos(e);
        this.pointLast = this.pointStart;
    }
    moveEvtHandler(e: any) {
        this.pointCurrent = this.getTouchPos(e);
        const moveLengthX = this.getDistX(this.pointLast, this.pointCurrent);
        const moveDir = this.getSwipDir(this.pointLast, this.pointCurrent);
        let offsetProgress = 0;
        if (moveDir === 'left') {
            offsetProgress =  -moveLengthX;
        } else if (moveDir === 'right') {
            offsetProgress = moveLengthX;
        }
        const currentLeft = this.refs.circle ? parseInt((this.refs.circle as HTMLDivElement).style.left, 10) : this.props.bright;
        const left = this.getLeft(currentLeft, offsetProgress);
        this.props.actions.changeScreenBright(left);
        this.pointLast = this.pointCurrent;
    }
    endEvtHandler() {
        this.reset();
    }
    reset() {
      this.pointStart = { x: 0, y: 0 };
      this.pointCurrent = { x: 0, y: 0 };
    }
    getLeft(currentLeft: number, offsetProgress: number) {
        const left = currentLeft + offsetProgress;
        if (left > 206) {
            return 206;
        } else if (left < 16) {
            return 16;
        } else {
            return left;
        }
    }
    render() {
        const { bright } = this.props;
        return (
            <div className='progress-set'
            onTouchStart={this.startEvHandle}
            onTouchMove={this.moveEvtHandler}
            onTouchEnd={this.endEvtHandler}>
                <div className='progerss-bar'>
                    <div className='left' style={{flex: bright - 16}} />
                    <div className='right' style={{flex: 206 - bright}} />
                </div>
                <div className='progress-circle' ref='circle' style={{left: `${bright}px`}}></div>
            </div>
        );
    }
}

function mapStateToProps(state: IAllState) {
  return {
      bright: state.bright.get('left'),
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
)(ProgerssBar);
