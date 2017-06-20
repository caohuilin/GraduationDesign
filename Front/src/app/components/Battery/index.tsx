import * as React from 'react';

import { IBatteryProps, IBatteryState } from '../../constants/ComponentsType';
import './style.less';

class Battery extends React.Component<IBatteryProps, IBatteryState> {
    constructor(props: IBatteryProps) {
      super(props);
      this.state = {
        battery: 1,
        charging: false
      };
      this.getBattery = this.getBattery.bind(this);
    }
    componentDidMount() {
        this.getBattery();
    }
    getBattery() {
       (navigator as any).getBattery().then(res => {
           this.setState({ battery: res.level, charging: res.charging });
        });
    }
    render() {
        const level =  (this.state.battery * 100).toFixed(0);
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return (
            <div id='battery'>
                { hours } : { minutes }
                {
                    this.state.charging ?
                    <div className='battery'>
                        <i className='iconfont weui-tabbar__icon'>&#xe627;</i>
                    </div>
                    :
                    <div className='battery'>
                        <div className='left' style={{flex: level}}></div>
                        <div className='right' style={{flex: 100 - +level}}></div>
                    </div>
                }
            </div>
        );
    }
}

export default Battery;
