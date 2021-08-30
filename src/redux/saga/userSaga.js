import { history } from '../../utils/history'
import { call, put, takeLatest, delay, select } from 'redux-saga/effects'
import { userServices } from '../../services/UserServices'
import { ACCESS_TOKEN, USER_LOGIN, STATUS_CODE } from '../../utils/system'
import { DELETE_USER_SAGA, GET_LIST_USER, GET_LIST_USER_SAGA, GET_LIST_USER_SEARCH, GET_LIST_USER_SEARCH_SAGA, GET_USER_DETAIL, GET_USER_DETAIL_SAGA, GET_USER_LOGIN, GET_USER_LOGIN_SAGA, POST_USER_SIGNUP_SAGA, SET_LOADING_TABLE, SUBMIT_EDIT_USER_SAGA } from '../constants/UserConstant'
import { HIDE_LOADING, OPEN_LOADING } from '../constants/LoadingConstants'
import { openNotificationWithIcon } from '../../utils/notification'
import { HIDE_MODAL } from '../constants/ModalConstant'
function* signInUserSaga(action) {
  yield put({
    type: OPEN_LOADING
  })
  yield delay(500)
  const { userLogin } = action
  try {
    const { data, status } = yield call(() => userServices.signInUser(userLogin))
    localStorage.setItem(ACCESS_TOKEN, data.content.accessToken)
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

    yield put({
      type: GET_USER_LOGIN,
      dataLogin: data.content
    })

    history.push('/home')
  } catch (error) {
    openNotificationWithIcon('error', error.response.data.message)
  }
  yield put({
    type: HIDE_LOADING
  })
}

export function* theoDoiSignInUserSaga() {
  yield takeLatest(GET_USER_LOGIN_SAGA, signInUserSaga)
}


function* signUpUserSaga(action) {
  yield put({
    type: OPEN_LOADING
  })
  yield delay(700)
  const { userSignUp } = action
  try {
    const { data, status } = yield call(() => userServices.signUpUser(userSignUp))
    if (status == STATUS_CODE.SUCCESS) {
      yield put({
        type: HIDE_LOADING
      })
      yield put({
        type: GET_USER_LOGIN_SAGA,
        userLogin: {
          'email': data.content.email,
          'password': data.content.passWord
        }
      })
    }

  } catch (error) {
    yield put({
      type: HIDE_LOADING
    })
    console.log(error.response.data)
    openNotificationWithIcon('error', error.response.data.message)
  }
}

export function* theoDoiSignUpUserSaga() {
  yield takeLatest(POST_USER_SIGNUP_SAGA, signUpUserSaga)
}

function* getListUserSaga() {

  yield put({
    type: SET_LOADING_TABLE,
    loading: true
  })

  const { data, status } = yield call(() => userServices.getListUser())
  try {
    if (status == STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_USER,
        listUs: data.content,
        loading: false
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export function* theoDoiGetListUserSaga() {
  yield takeLatest(GET_LIST_USER_SAGA, getListUserSaga)
}

function* deleteUserSaga(action) {
  const { idUser } = action

  const { data, status } = yield call(() => userServices.deleteUser(idUser))

  try {
    if (status == STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_USER_SAGA
      })
      openNotificationWithIcon('success', 'Xóa thành công')
    } 
  } catch (error) {
    console.log(error.response.data)
    openNotificationWithIcon('error', 'Xóa thất bại')
  }

}

export function* theodoiDeleteUserSaga() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}

function* getDetailUserSaga(action){
  const { idUser } = action

  const {data,status} = yield call(() => userServices.getUserDetail(idUser))
  try {
    if(status == STATUS_CODE.SUCCESS){
      let arrUser = data.content.filter((user,index) => user.userId == idUser)
      yield put({
        type: GET_USER_DETAIL,
        content: arrUser[0]
      })
    }
  } catch (error) {
    console.log(error.response.data)
  }
  
}

export function* theoDoiGetDetailUserSaga(){
  yield takeLatest(GET_USER_DETAIL_SAGA,getDetailUserSaga)
}

function* submitEditUserSaga(action){
  const {userEditData} = action
  const {data,status} = yield call(() => userServices.editUser(userEditData))
  try {
    if(status == STATUS_CODE.SUCCESS){
      yield put({
        type:HIDE_MODAL
      })
      yield delay(700)
      yield put({
        type:GET_LIST_USER_SAGA
      })
     
    }
  } catch (error) {
    console.log(error)
  }
}

export function* theoDoiSubmitEditUserSaga() {
  yield takeLatest(SUBMIT_EDIT_USER_SAGA,submitEditUserSaga)
}

function* getListUserSearchSaga(action){
  const {contentUser} = action
  const {data,status} = yield call(() => userServices.getListUserSearch(contentUser))
  try {
    yield put({
      type: GET_LIST_USER_SEARCH,
      listUsSearch: data.content
    })
  } catch (error) {
    console.log(error)
  }
}


export function* theoDoiGetListUserSearchSaga() {
  yield takeLatest(GET_LIST_USER_SEARCH_SAGA,getListUserSearchSaga)
}