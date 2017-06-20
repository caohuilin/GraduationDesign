import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Slider from 'react-slick';
import './style.less';

import { IAllState } from '../../constants/AppType';

class Welcome extends React.Component<any, any> {
  render() {
      const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
        <div className='app'>
          <Slider {...settings}>
              <div>1</div>
              <div>2</div>
              <div>3</div>
          </Slider>
        </div>
    );
  }

}

function mapStateToProps(state: IAllState, ownProps: any) {
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
)(Welcome);
