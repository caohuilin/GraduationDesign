import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form/immutable';
import * as AuthActions from '../../../actions/auth';
import { IAllState } from '../../../constants/ComponentsType';
import './style.less';

const isEmail = (value: string) => {
  return value.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/);
};

const isPhone = (value: string) => {
  return value.match(/^1[34578]\d{9}$/);
};
let time = null;

const validate = values => {
  let errors: any = {};
  if (!values.get('nickname')) {
    errors.nickname = '请输入昵称';
  }
  if (!values.get('account')) {
    errors.account = '请输入邮箱或者手机号';
  } else if (!isEmail(values.get('account')) && !isPhone(values.get('account'))) {
    errors.account = '请输入正确的邮箱或手机号';
  }
  if (!values.get('vcode')) {
    errors.vcode = '请输入验证码';
  } else if (values.get('vcode').length !== 4) {
    errors.vcode = '请输入正确的验证码';
  }
  if (!values.get('password')) {
    errors.password = '请输入密码';
  }
  if (!values.get('passwordRepeat')) {
    errors.passwordRepeat = '请再次输入密码';
  } else if (values.get('password') !== values.get('passwordRepeat')) {
    errors.passwordRepeat = '两次输入密码不一致';
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className='input-field'>
    <input {...input} placeholder={label} type={type} />
    {touched && error && <span>{error}</span>}
  </div>
);

const renderVcodeField = ({ input, label, type, getVcode, leftTime, meta: { touched, error } }) => (
  <div className='vcode-field'>
    <div className='input-field'>
      <input {...input} placeholder={label} type={type} />
    </div>
    <button type='button' onClick={getVcode}>{leftTime > 0 ? `${leftTime}s后可重新获取` : '获取验证码'}</button>
    {touched && error && <span>{error}</span>}
  </div>
);

class RegisterForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      leftTime: 0,
      success: false,
    };
    this.submit = this.submit.bind(this);
    this.countDown = this.countDown.bind(this);
    this.getVcode = this.getVcode.bind(this);
  }
  submit(values: any) {
    this.props.AuthActions.registerRequest(values.toJS());
  }
  countDown() {
    if (this.state.leftTime > 0) {
      return;
    }
    if (this.state.leftTime <= 0) {
      clearInterval(time);
    }
    this.setState({ leftTime: 60 });
    time = setInterval(() => {
      if (this.state.leftTime <= 0) {
        clearInterval(time);
      } else {
        this.setState({ leftTime: this.state.leftTime - 1 });
      }
    }, 1000);
  }
  getVcode() {
    this.countDown();
  }
  getErrorMessage(error: string) {
    switch (error) {
      case '':
        return '';
      case 'user exists':
        return '用户已经存在';
      default:
        return '服务器错误，请稍后重试';
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.auth.get('register').get('data') !== null && this.props.auth.get('register').get('data') === null) {
        this.setState({success: true});
        (document.getElementsByClassName('back')[0] as any).click();
    }
  }
  render() {
    const { handleSubmit, submitting, auth } = this.props;
    const error = auth.get('register').get('error') ? auth.get('register').get('error').detail : '';
    return (
      <form className='register-form' onSubmit={handleSubmit(this.submit)}>
        <Field name='nickname' type='text' component={renderField} label='昵称' />
        <Field name='account' type='text' component={renderField} label='邮箱或者手机号' />
        <Field name='vcode' type='text' leftTime={this.state.leftTime} getVcode={this.getVcode} component={renderVcodeField} label='验证码' />
        <Field name='password' type='password' component={renderField} label='密码' />
        <Field name='passwordRepeat' type='password' component={renderField} label='重复密码' />
        <div className='form-checkbox'>
          <div></div>
          <Link onClick={this.props.handleClick} to='/login'>已有账号？</Link>
        </div>
        <button type='submit' disabled={submitting}>注册</button>
        {error && <div className='error'>{this.getErrorMessage(error)}</div>}
        {this.state.success && <div className='success'>注册成功！</div>}
      </form>
    );
  }
}

function mapStateToProps(state: IAllState) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    AuthActions: bindActionCreators(Object.assign({}, AuthActions), dispatch)
  };
}

export default reduxForm({
  form: 'asyncValidation', // a unique identifier for this form
  validate,
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm));
