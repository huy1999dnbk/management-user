import React, { useEffect, useState,useRef } from 'react'
import { Button, Input, Popconfirm, Table, Tag, Space } from 'antd'

import { useDispatch, useSelector } from 'react-redux';
import { DELETE_USER_SAGA, GET_LIST_USER_SAGA, GET_LIST_USER_SEARCH_SAGA, GET_USER_DETAIL_SAGA } from '../redux/constants/UserConstant';
import { OPEN_MODAL_EDIT } from '../redux/constants/ModalConstant';
import FormEdit from '../component/FormEdit'


export default function ManagementUser() {
  const [searchUser, setSearchUser] = useState('')
  const searchTimeOut = useRef(null)
  const { listUser, isTableLoading } = useSelector(state => state.UserReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: GET_LIST_USER_SAGA
    })
  }, [])


  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      },
      // sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (item2, item1) => {
        let email1 = item1.email?.length;
        let email2 = item2.email?.length;
        if (email2 < email1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (item2, item1) => {
        let name1 = item1.name?.trim().toLowerCase()
        let name2 = item2.name?.trim().toLowerCase()
        if (name2 < name1) {
          return -1
        }
        return 1
      }
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" ghost onClick={() => {
            dispatch({
              type: OPEN_MODAL_EDIT,
              data: {
                isVisible: true,
                component: <FormEdit />,
                title: 'FORM EDIT',
              }
            })
            dispatch({
              type:GET_USER_DETAIL_SAGA,
              idUser: record.userId
            })
          }}>Edit</Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure to delete this user"
            onConfirm={() => dispatch({
              type: DELETE_USER_SAGA,
              idUser: record.userId
            })}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>

        </Space>
      )
    },
  ];


  return (
    <div className="container-fluid">
      <Input value={searchUser} className="my-5 mr-5" style={{ width: '75%' }} onChange={(e) => {
        let val = e.target.value
        setSearchUser(val)
        if(searchTimeOut.current){
          clearInterval(searchTimeOut.current)
        }
        searchTimeOut.current = setTimeout(() => {
          dispatch({
            type:GET_LIST_USER_SEARCH_SAGA,
            contentUser: val
          })
        },1000)
      }} />
      <Table rowKey={"userId"} columns={columns} dataSource={listUser} loading={isTableLoading} />
    </div>
  )
}
