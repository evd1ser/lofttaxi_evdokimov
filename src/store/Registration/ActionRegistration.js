import { createActions } from 'redux-actions'

const AuthActionCreators = createActions({
  REGISTRATION_REQUEST: (user) => {
    return user
  },
  REGISTRATION_ERROR: (message) => {
    return { message }
  },
})

const registrationRequest = AuthActionCreators.registrationRequest
const registrationError = AuthActionCreators.registrationError

export { registrationRequest, registrationError }
