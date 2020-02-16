import { handleActions } from 'redux-actions'
import { login, logout, loginError, loginRequest } from './ActionAuth'
import { initApp } from '../mainActions'
const initialState = {
  user: null,
  isLoading: false,
  isLogged: false,
  error: null,
}

const ReducerAuth = handleActions(
  {
    [initApp]: (state) => {
      return {
        ...state,
        isLoading: false,
        error: null,
      }
    },
    [loginRequest]: () => {
      return {
        isLoading: true,
        error: null,
      }
    },
    [login]: (_state, action) => {
      return {
        user: {
          ...action.payload,
        },
        isLogged: true,
        isLoading: false,
        error: null,
      }
    },
    [logout]: () => {
      return {
        user: null,
        isLogged: false,
        isLoading: false,
        error: null,
      }
    },
    [loginError]: (_state, action) => {
      return {
        user: null,
        isLogged: false,
        isLoading: false,
        error: action.payload.message,
      }
    },
  },
  initialState
)
export default ReducerAuth
