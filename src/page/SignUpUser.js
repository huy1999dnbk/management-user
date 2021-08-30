import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Input } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined,PhoneOutlined,UserAddOutlined   } from '@ant-design/icons';
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { POST_USER_SIGNUP_SAGA } from '../redux/constants/UserConstant';
function SignUpUser(props) {
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
          <h3 className="mb-5" style={{ fontStyle: 'italic' }}>Sign Up Management User</h3>
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

          <Input onChange={handleChange} className="p-1 mt-3" name="phone" placeholder="Phone" prefix={<PhoneOutlined />} />
          <span className="text-danger font-weight-bold">{errors.phone}</span>

          <Input onChange={handleChange} className="p-1 mt-3" name="name" placeholder="Name" prefix={<UserAddOutlined />} />
          <span className="text-danger font-weight-bold">{errors.name}</span>
          <div className="d-flex justify-content-center mt-3">
            <Button className="mr-3" htmlType="submit" type="primary" shape="round">Đăng kí</Button>
            <NavLink to="/signin" >
              <Button type="primary" shape="round">Đăng nhập</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  )
}

const UserSignUpWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
    phone: '',
    name: ''
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().required('email không được để trống!').email('email không hợp lệ'),
    password: Yup.string().required('password không được để trống').min(6, 'mật khẩu phải có ít nhất 6 kí tự'),
    phone: Yup.string().required('Số điện thoại không được để trống').matches(/(09|01[2|6|8|9])+([0-9]{8})\b/,"Số điện thoại không hợp lệ"),
    name: Yup.string().required('Tên không được để trống')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type:POST_USER_SIGNUP_SAGA,
      userSignUp:{
        'email':values.email,
        'passWord':values.password,
        'name':values.name,
        'phoneNumber':values.phone
      }
    })
  },
  displayName: 'LoginForm',
})(SignUpUser);

export default connect()(UserSignUpWithFormik)
