import React from 'react'
import { Button, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { withFormik } from 'formik'
import {connect} from 'react-redux'
import * as Yup from 'yup'
import {GET_USER_LOGIN_SAGA} from '../redux/constants/UserConstant'
function SignInUser(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <form onSubmit={handleSubmit} style={{ height: '100%' }} className="container-fluid" >

      <div style={{ height: '100%' }} className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column">
          <h3 className="mb-5" style={{ fontStyle: 'italic' }}>Login Management User</h3>
          <Input onChange={handleChange} className="p-1" name="email" placeholder="Email" prefix={<UserOutlined />} />
          <span className="text-danger font-weight-bold">{errors.email}</span>
          <Input.Password
            onChange={handleChange}
            className="p-1 mt-3"
            name="password"
            prefix={<LockOutlined />}
            placeholder="Password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <span className="text-danger font-weight-bold">{errors.password}</span>
          <div className="d-flex justify-content-center mt-3">
            <Button className="mr-3" htmlType="submit" type="primary" shape="round">Đăng nhập</Button>
            <NavLink to="/signup" >
              <Button type="primary" shape="round">Đăng kí</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  )
}

const UserLoginWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().required('email không được để trống!').email('email không hợp lệ'),
    password: Yup.string().required('password không được để trống').min(6, 'mật khẩu phải có ít nhất 6 kí tự')
  }),
  handleSubmit: (values, {props, setSubmitting }) => {
    props.dispatch({
      type:GET_USER_LOGIN_SAGA,
      userLogin:{
        'email':values.email,
        'password':values.password,
      }
    })
  },
  displayName: 'LoginForm',
})(SignInUser);

export default connect()(UserLoginWithFormik)

