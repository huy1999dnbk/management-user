import {applyMiddleware,combineReducers,createStore} from 'redux'
import createMiddleWareSage from 'redux-saga'
import LoadingReducer from './reducer/LoadingReducer'
import ModalReducer from './reducer/ModalReducer'
import UserReducer from './reducer/UserReducer'
import {rootSaga} from './saga/rootSaga'
const middleWareSaga = createMiddleWareSage()
const rootReducer = combineReducers({
  UserReducer,
  LoadingReducer,
  ModalReducer
})

const store = createStore(rootReducer,applyMiddleware(middleWareSaga))

middleWareSaga.run(rootSaga)

export default store

