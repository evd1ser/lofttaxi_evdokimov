import { combineReducers } from 'redux'
import auth from './Auth/ReducerAuth'

const todoApp = combineReducers({
  auth,
})

export default todoApp
