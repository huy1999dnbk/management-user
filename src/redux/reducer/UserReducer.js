import { USER_LOGIN } from '../../utils/system'
import { GET_LIST_USER, GET_LIST_USER_SEARCH, GET_USER_DETAIL, GET_USER_LOGIN, SET_LOADING_TABLE } from '../constants/UserConstant'

let usLogin = {}

if(localStorage.getItem(USER_LOGIN)){
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
  userLogin: usLogin,
  listUser: [],
  isTableLoading:false,
  userEdit:{}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LOGIN:
      return { ...state, userLogin:action.dataLogin }
    case GET_LIST_USER:
      return {...state, listUser: action.listUs,isTableLoading:action.loading}
    case SET_LOADING_TABLE:
      return {...state,isTableLoading:action.loading}
    case GET_USER_DETAIL:
      return {...state,userEdit:action.content}
    case GET_LIST_USER_SEARCH:
      return {...state,listUser:action.listUsSearch}
    default:
      return {...state}
  }
}
