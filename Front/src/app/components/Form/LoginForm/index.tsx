import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form/immutable';
import * as AuthActions from '../../../actions/auth';

import { IAllState } from '../../../constants/ComponentsType';
import './style.less';

const validate = values => {
  let errors: any = {};
  if (!values.get('account')) {
    errors.account = '请输入用户名';
  } else if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(values.get('account'))) && !values.get('account').match(/^1[34578]\d{9}$/)) {
    errors.account = '请输入邮箱或手机号';
  }
  if (!values.get('password')) {
    errors.password = '请输入密码';
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className='input-field'>
    <input {...input} placeholder={label} type={type} />
    {touched && error && <span>{error}</span>}
  </div>
);

class LoginForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      success: false
    };
    this.submit = this.submit.bind(this);
  }
  getErrorMessage(error: string) {
    switch (error) {
      case '':
        return '';
      case 'bad password':
        return '账号密码错误';
      default:
        return '服务器错误，请稍后重试';
    }
  }
  submit(values: any) {
    this.props.AuthActions.loginRequest(values.toJS());
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.auth.get('login').get('data') !== null && this.props.auth.get('login').get('data') === null) {
      this.setState({ success: true });
      (document.getElementsByClassName('back')[0] as any).click();
    }
  }
  render() {
    const { handleSubmit, submitting, auth } = this.props;
    const error = auth.get('login').get('error') ? auth.get('login').get('error').detail : '';
    return (
      <form className='login-form' onSubmit={handleSubmit(this.submit)}>
        <Field name='account' type='text' component={renderField} label='用户名' />
        <Field name='password' type='password' component={renderField} label='密码' />
        <div className='form-checkbox'>
          <div>
            <Field name='remember' id='remember' component='input' type='checkbox' />
            <span>记住我</span>
          </div>
          <Link to='forgetPassword'>忘记密码？</Link>
        </div>
        <button type='submit' disabled={submitting}>登录</button>
        {error && <div className='error'>{this.getErrorMessage(error)}</div>}
        {this.state.success && <div className='success'>登录成功！</div>}
      </form>
    );
  }
}

function mapStateToProps(state: IAllState) {
  return {
    auth: state.auth
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
)(LoginForm));
