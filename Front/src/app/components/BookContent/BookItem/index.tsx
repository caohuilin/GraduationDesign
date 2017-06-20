import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BookContentActions from '../../../actions/bookcontent';
import { IAllState, IBookItemProps, IBookItemState } from '../../../constants/ComponentsType';
import './style.less';

class BookItem extends React.Component<IBookItemProps, IBookItemState> {
    componentDidUpdate(prevProps: IBookItemProps) {
      if (prevProps.content.size === 0 && this.props.content.size > 0 || prevProps.fontSize !== this.props.fontSize) {
         const allWidth = (this.refs.wrap as HTMLDivElement).scrollWidth;
         const everyWidth = (this.refs.content as HTMLDivElement).offsetWidth + 20;
         const page = Math.round(allWidth / everyWidth);
         this.props.actions.getPageWidth({ everyWidth: everyWidth, page: page });
      }
    }
    render() {
      const { i, x, y, bright, night, fontSize } = this.props;
      /**
       * 最小亮度为30%，最大亮度为100%，left 最小值为6，最大值为206
       * （left - 6）/ 206 - 6 === (brightness - 0.3) / 0.7
       * 初始亮度为95，所以计算left为186
       */
      const brightness = (((bright - 6) * 0.7 / 200 + 0.3) * 100).toFixed(0);
      const style = night ? 
      {transform: `translateX(${x}px)`, zIndex: i}
      :
      {transform: `translateX(${x}px)`, zIndex: i, background: `hsl(0, 0%, ${brightness}%)`};
      return (
        <div className={night ? 'book-content book-content-night' : 'book-content'} ref='content' style={style}>
          <div className='wrap' ref='wrap' style={{transform: `translateX(-${y}px)`, fontSize: `${fontSize}px`}}>
            { this.props.content.map((item, i) => {
              return (
                <p key={i}>{item}</p>
              );
            }) }
          </div>
      </div>
      );
    }
}

function mapStateToProps(state: IAllState) {
  return {
    content: state.content.get('content'),
    bright: state.bright.get('left'),
    night: state.bright.get('night'),
    fontSize: state.font.get('fontSize'),
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(Object.assign({}, BookContentActions), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookItem);
