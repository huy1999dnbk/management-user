import { HIDE_LOADING, OPEN_LOADING } from '../constants/LoadingConstants'

const initialState = {
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOADING:
      return { ...state, isLoading: true }
    case HIDE_LOADING:
      return { ...state, isLoading: false }
    default:
      return { ...state }
  }
}
