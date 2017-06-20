import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { IAllState } from '../../constants/ComponentsType';
import './style.less';

class RemindPopup extends React.Component<any, any> {
    render() {
        const { bookId, menuId } = this.props;
        return (
            <div className='remind-popup'>
                <p>是否回到上次阅读？</p>
                <div className='button-group'>
                    <a onClick={this.props.handleClick}>暂时不了</a>
                    <Link onClick={this.props.handleClick} to={`/home/book/${bookId}/content/${menuId}`}>继续阅读</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: IAllState) {
    return {
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemindPopup);
