import { createActions, createAction } from 'redux-actions'
const AuthActionCreators = createActions({
  LOGIN: (email, token) => {
    return { email, token }
  },
  LOGIN_REQUEST: (email, password) => {
    return { email, password }
  },
  LOGIN_ERROR: (message) => {
    return { message }
  },
  ERROR: undefined,
})

const loginRequest = AuthActionCreators.loginRequest
const loginError = AuthActionCreators.loginError
const login = AuthActionCreators.login
const loginStart = createAction('LOGIN_START')
const logout = createAction('LOGOUT')

export { login, logout, loginRequest, loginStart, loginError }
