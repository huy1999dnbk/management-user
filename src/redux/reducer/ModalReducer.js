import React from "react"
import {OPEN_MODAL,HIDE_MODAL,OPEN_MODAL_LOGOUT, OPEN_MODAL_EDIT} from '../constants/ModalConstant'
import { SET_SUBMIT_EDIT_USER } from "../constants/UserConstant"
const initialState = {
  isVisible: false,
  title:'',
  ComponentContent: <p>hello</p>,
  CallBackFunc: (propsVal) => {
    alert('hello')
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_LOGOUT:{
      state.isVisible = action.data.isVisible
      state.title = action.data.title
      state.ComponentContent = action.data.component
      state.CallBackFunc = action.data.handleSignOut
      return {...state}
    }
    case HIDE_MODAL:
      return { ...state, isVisible:false }
    case OPEN_MODAL_EDIT:
      state.isVisible = action.data.isVisible
      state.title = action.data.title
      state.ComponentContent = action.data.component
      return {...state}

    case SET_SUBMIT_EDIT_USER:
      return {...state,CallBackFunc:action.submitFunc}
    default:
      return {...state}
  }
}
