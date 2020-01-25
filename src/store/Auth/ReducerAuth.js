import { handleActions } from 'redux-actions'
import { login, logout } from './ActionAuth'

const initialState = {
  isFetching: false,
  user: null,
  isLogged: false,
  cardInformation: false,
  error: null,
}

const ReducerAuth = handleActions(
  {
    [login]: (state, action) => {
      console.log(state)
      console.log(action)

      return {
        user: action.payload,
        isLogged: true,
      }
    },
    [logout]: (state, action) => ({
      user: null,
      isLogged: false,
    }),
  },
  initialState
)
export default ReducerAuth
