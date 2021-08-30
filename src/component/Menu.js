import React from 'react'
import './menu.css'
import { useSelector } from 'react-redux'
import { HomeOutlined, UsergroupAddOutlined, ProjectOutlined, ContainerOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { HIDE_MODAL, OPEN_MODAL_LOGOUT } from '../redux/constants/ModalConstant';
import {history} from '../utils/history'
export default function Menu() {
  
  
  // em css nhu mentor da chi dan tren group dung position fixed nhung ko dc, cuoi cung em chon giai phap set cung chieu cao cho cai munu trong file menu.css luon a :))

  // tai thoi diem em lam bai nay thi mot so user bi loi data ko xoa dc nen dan den tinh trang neu mentor xoa 1 user ko the xoa thi sau do ko the xoa cac user khac ma phai refresh la trang moi xoa bth dc

  const { userLogin } = useSelector(state => state.UserReducer)
  const dispatch = useDispatch()
  return (
    <div className="container-fluid bgcolor text-white px-2">
      <div className="userInfo mt-3 px-4">
        <div className="avatar">
          <img src={userLogin.avatar} alt={userLogin.name} />
        </div>
        <div className="userTittle">
          <p>{userLogin.name}</p>
          <p>{userLogin.phoneNumber}</p>
        </div>
      </div>
      <div className="navs">
        <div>
          <HomeOutlined />
          <NavLink style={{ color: 'white' }} className=" ml-2" activeStyle={{ color: '#F8485E' }} to='/cyberboard'>CyberBoard</NavLink>
        </div>
        <div>
          <ProjectOutlined />
          <NavLink style={{ color: 'white' }} className=" ml-2" activeStyle={{ color: '#F8485E' }} to='/projectmanagement'>
            Project Management
          </NavLink>
        </div>
        <div>
          <ContainerOutlined />
          <NavLink style={{ color: 'white' }} className=" ml-2" activeStyle={{ color: '#F8485E' }} to='/createproject'>Creat Project</NavLink>
        </div>
        <div>
          <UsergroupAddOutlined />
          <NavLink style={{ color: 'white' }} className=" ml-2" activeStyle={{ color: '#F8485E' }} to='/home'>
            User Management
          </NavLink>
        </div>
        <div>
          <HomeOutlined />
          <span className="ml-2" onClick={() => {
            dispatch({
              type: OPEN_MODAL_LOGOUT,
              data:{
                isVisible:true,
                component: <p>Bạn có chắc chắn muốn đăng xuất?</p>,
                title:'ĐĂNG XUẤT',
                handleSignOut: async () => {
                  try {
                    await localStorage.clear()
                    dispatch({
                      type:HIDE_MODAL
                    })
                    history.push('/signin')
                  } catch (error) {
                    console.log(error)
                  }
                }
              }
            })
          }}>Exit</span>
        </div>
      </div>
    </div>
  )
}
