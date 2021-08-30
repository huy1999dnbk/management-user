import React from 'react'
import { Modal, Button } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { HIDE_MODAL } from '../redux/constants/ModalConstant';
export default function ModalHOC() {
  const {isVisible,title,ComponentContent,CallBackFunc} = useSelector(state => state.ModalReducer)
  const dispatch = useDispatch()
  return (
    <div>
      <Modal title={title} visible={isVisible} onOk={CallBackFunc} onCancel={() => {
        dispatch({
          type:HIDE_MODAL
        })
      }}>
        {ComponentContent}
      </Modal>
    </div>
  )
}
