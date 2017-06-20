import * as React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import * as CollectAction from '../../actions/collect';

import { IAllState, IBookContentHeaderProps, IBookContentHeaderState } from '../../constants/ComponentsType';
import './style.less';

class BookContentHeader extends React.Component<IBookContentHeaderProps, IBookContentHeaderState> {
    constructor(props: IBookContentHeaderProps) {
        super(props);
        this.state = {
            collect : false,
        };
        this.collect = this.collect.bind(this);
        this.isCollected = this.isCollected.bind(this);
    }
    collect() {
        this.setState({collect: !this.state.collect});
        const action = this.isCollected(this.props) ? 'delete' : 'add';
        this.props.CollectActions.collectBook({ book_id: Number(this.props.bookId), action: action });
    }

    componentDidMount() {
        this.props.CollectActions.getCollectBooks();
    }

    componentWillReceiveProps(nextProps: IBookContentHeaderProps) {
        if (nextProps.collect.get('list').size !== this.props.collect.get('list').size) {
            this.setState({collect: this.isCollected(nextProps)});
        }
    }

    isCollected(props: IBookContentHeaderProps) {
        let isCollected = false;
        props.collect.get('list').map((item) => {
            if (item.id === props.bookId) {
                isCollected = true;
                return;
            }
        });
        return isCollected;
    }
    render() {
        const isCollected = this.isCollected(this.props) || this.state.collect;
        return (
            <Motion style={{ x: spring(this.props.show ? 0 : -60) }}>
                {({ x }) => {
                    return (<div className='book-content-header' style={{ transform: `translateY(${x}px)` }}>
                        <Link to={`/home/book/${this.props.bookId}`} className='left'>
                            <i className='iconfont weui-tabbar__icon'>&#xe609;</i>
                        </Link>
                        <div className='right'>
                            <div className='icon' onClick={this.collect}>{isCollected ? 
                                <i className='iconfont weui-tabbar__icon'>&#xe622;</i> : <i className='iconfont weui-tabbar__icon'>&#xe64d;</i>}</div>
                            <div className='icon' onClick={this.props.setShareShow}><i className='iconfont weui-tabbar__icon'>&#xe612;</i></div>
                        </div>
                    </div>
                    );
                }
                }
            </Motion>
        );
    }
}

function mapStateToProps(state: IAllState, ownProps: any) {
    return {
        collect: state.collect,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        CollectActions: bindActionCreators(Object.assign({}, CollectAction), dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookContentHeader);
