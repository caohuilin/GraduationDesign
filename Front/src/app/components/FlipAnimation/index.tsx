import * as React from 'react';

import { IPoint } from '../../constants/ComponentsType';
import './style.less';

class FlipAnimation extends React.Component<any, any> {
    pointStart= { x: 0, y: 0 };
    pointCurrent = { x: 0, y: 0 };
    pointLast= { x: 0, y: 0 };
    pointEnd = { x: 0, y: 0 };
    pointMiddle = { x: 0, y: 0 };
    currentDir = '';
    changeDir = true;
    constructor(props: any) {
        super(props);
        this.startEvHandle = this.startEvHandle.bind(this);
        this.moveEvtHandler = this.moveEvtHandler.bind(this);
        this.endEvtHandler = this.endEvtHandler.bind(this);
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

    // 计算两点之间的垂直距离
    getDistY(p1: IPoint, p2: IPoint): number {
      return Math.abs(p1.y - p2.y);
    }

    // 计算两点之间的距离
    getDist(p1: IPoint, p2: IPoint): number {
      return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
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
      this.pointMiddle = this.pointStart;
    }

    moveEvtHandler(e: any) {
      this.pointCurrent = this.getTouchPos(e);
      const moveLengthX = this.getDistX(this.pointStart, this.pointCurrent);
      const moveDir = this.getSwipDir(this.pointStart, this.pointCurrent);
      const moveDirCurrent = this.getSwipDir(this.pointLast, this.pointCurrent);
      this.pointLast = this.pointCurrent;

      if (moveDirCurrent !== this.currentDir && moveDirCurrent !== 'down' && moveDirCurrent !== 'up') {
        this.currentDir = moveDirCurrent;
        this.pointMiddle = this.pointCurrent;
        this.changeDir = !this.changeDir;
      }
      if (!this.props.worked) {
        return;
      }
      if (moveDir === 'left') {
        this.props.setOffset(-moveLengthX);
      } else if (moveDir === 'right') {
          this.props.setOffset(moveLengthX);
      }
    }

    endEvtHandler() {
      // touch结束的位置等于next最后的位置，end之后，位置是获取不到的
      this.pointEnd = this.pointCurrent;
      const moveLengthX = this.getDistX(this.pointStart, this.pointEnd);
      const moveDir = this.currentDir;

      if (this.props.worked && (moveLengthX < 5 || moveDir === '')) {
        this.props.setWorked();
        return;
      }
      if (!this.props.worked) {
        this.props.setWorked();
        return;
      }
      if (moveDir === 'left' && moveLengthX > 5 && !this.changeDir) {
        this.props.nextPage();
      } else if (moveDir === 'right' && moveLengthX > 5 && !this.changeDir) {
        this.props.prevPage();
      }
      this.reset();
      this.props.setOffset(0);
    }

    reset() {
      this.pointStart = { x: 0, y: 0 };
      this.pointCurrent = { x: 0, y: 0 };
      this.pointLast = { x: 0, y: 0 };
      this.pointEnd = { x: 0, y: 0 };
      this.pointMiddle = { x: 0, y: 0 };
      this.currentDir = '';
      this.changeDir = true;
    }

    render() {
        return (
            <div className='book-content-in' onTouchStart={this.startEvHandle} onTouchMove={this.moveEvtHandler} onTouchEnd={this.endEvtHandler}>
                {this.props.children}
            </div>
        );
    }
}

export default FlipAnimation;
