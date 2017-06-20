import * as React from 'react';
import { Motion, spring } from 'react-motion';
import { IShareProps, IShareState} from '../../constants/ComponentsType';
import './style.less';

const WeChatCircleImg = './app/resources/images/wechatcicle.png';
const QQCircleImg = './app/resources/images/qqcircle.png';
const WeiBoImg = './app/resources/images/weibo.png';
const WechatImg = './app/resources/images/wechat.png';
const QQImg = './app/resources/images/qq.png';

const SharePlatform = [{
        name: '朋友圈',
        icon:  WeChatCircleImg,
        link: '#'
    }, {
        name: 'QQ空间',
        icon: QQCircleImg,
        link: '#'
    }, {
        name: '新浪微博',
        icon: WeiBoImg,
        link: '#'
    }, {
        name: '微信好友',
        icon: WechatImg,
        link: '#'
    }, {
        name: 'qq好友',
        icon: QQImg,
        link: '#'
    }
];

class Share extends React.Component<IShareProps, IShareState> {
  render() {
    return (
        <Motion style={{x: spring(this.props.showShare ? 0 : 100)}}>
        {({x}) => {
            return (
                <div className='share' style={{transform: `translateY(${x}px)`}}>
                {SharePlatform.map((item, i) => {
                return (
                    <a key={i} className='item' href={item.link}>
                        <img src={item.icon} alt={item.name} />
                        <span>{item.name}</span>
                    </a>);
                })
                }
                </div>
            );}
        }
        </Motion>
    );
  }
}

export default Share;
