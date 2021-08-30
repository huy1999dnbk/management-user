import { all } from 'redux-saga/effects'

import * as UserSaga from './userSaga'

export function* rootSaga(){
  yield all([
    UserSaga.theoDoiSignInUserSaga(),
    UserSaga.theoDoiSignUpUserSaga(),
    UserSaga.theoDoiGetListUserSaga(),
    UserSaga.theodoiDeleteUserSaga(),
    UserSaga.theoDoiGetDetailUserSaga(),
    UserSaga.theoDoiSubmitEditUserSaga(),
    UserSaga.theoDoiGetListUserSearchSaga(),
  ])
}