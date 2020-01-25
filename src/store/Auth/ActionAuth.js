import { createActions } from 'redux-actions'
const AuthActionCreators = createActions({
  LOGIN: (email, password) => {
    console.log(email)
    console.log(password)
    return { email, password }
  },
  LOGOUT: (amount) => ({ amount: -amount }),
  ERROR: undefined,
})

const login = AuthActionCreators.login
const logout = AuthActionCreators.logout

export { login, logout }
