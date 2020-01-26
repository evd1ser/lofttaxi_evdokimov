import { handleActions } from 'redux-actions'
import { registrationError, registrationRequest } from './ActionRegistration'
import { initApp } from '../mainActions'

const initialState = {
  isLoading: false,
  error: null,
}

const ReducerRegistration = handleActions(
  {
    [initApp]: () => {
      return {
        isLoading: false,
        error: null,
      }
    },
    [registrationRequest]: (state) => {
      return {
        error: null,
        isLoading: true,
      }
    },
    [registrationError]: (state, action) => {
      return {
        error: action.payload.message,
        isLoading: false,
      }
    },
  },
  initialState
)
export default ReducerRegistration
