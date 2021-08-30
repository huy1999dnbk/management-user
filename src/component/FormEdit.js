import React,{useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Input } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined,PhoneOutlined,UserAddOutlined   } from '@ant-design/icons';
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { POST_USER_SIGNUP_SAGA, SET_SUBMIT_EDIT_USER, SUBMIT_EDIT_USER_SAGA } from '../redux/constants/UserConstant';
function FormEdit(props) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type:SET_SUBMIT_EDIT_USER,
      submitFunc: handleSubmit
    })
  },[])

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <form onSubmit={handleSubmit} style={{width:'100%', height: '100%' }} className="container-fluid" >
      <div style={{ height: '100%' }} >
        <div className="d-flex flex-column">
          <Input value={values.userId} disabled className="p-1" name="userId" prefix={<UserOutlined />} />
          <Input value={values.email} onChange={handleChange} className="p-1 mt-3" name="email" placeholder="Email" prefix={<UserOutlined />} />
          <span className="text-danger font-weight-bold">{errors.email}</span>
          <span className="text-danger font-weight-bold">{errors.password}</span>

          <Input value={values.phoneNumber} onChange={handleChange} className="p-1 mt-3" name="phoneNumber" placeholder="Phone" prefix={<PhoneOutlined />} />
          <span className="text-danger font-weight-bold">{errors.phoneNumber}</span>

          <Input value={values.name} onChange={handleChange} className="p-1 mt-3" name="name" placeholder="Name" prefix={<UserAddOutlined />} />
          <span className="text-danger font-weight-bold">{errors.name}</span>
        </div>
      </div>
    </form>
  )
}

const EditUserWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {userEdit} = props
    return {
      userId:userEdit?.userId,
      email:userEdit.email,
      name:userEdit.name,
      phoneNumber:userEdit.phoneNumber,
    }
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().required('email không được để trống!').email('email không hợp lệ'),
    phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
    name: Yup.string().required('Tên không được để trống')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    let {userId,...rest} = values
    props.dispatch({
      type: SUBMIT_EDIT_USER_SAGA,
      userEditData: {
        'id':String(values.userId),
        ...rest
      }
    })
  },
  displayName: 'Edit form',
})(FormEdit);

const mapStateToProp = (state) => {
  return {
    userEdit: state.UserReducer.userEdit
  }
}

export default connect(mapStateToProp)(EditUserWithFormik)
