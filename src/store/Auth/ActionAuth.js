import { createActions } from 'redux-actions'
const AuthActionCreators = createActions({
  LOGIN: (email, token) => {
    return { email, token }
  },
  LOGIN_START: () => {},
  LOGIN_REQUEST: (email, password) => {
    return { email, password }
  },
  LOGIN_ERROR: (message) => {
    return { message }
  },
  LOGOUT: () => ({}),
  ERROR: undefined,
})

const loginRequest = AuthActionCreators.loginRequest
const loginError = AuthActionCreators.loginError
const loginStart = AuthActionCreators.loginStart
const login = AuthActionCreators.login
const logout = AuthActionCreators.logout

export { login, logout, loginRequest, loginStart, loginError }
