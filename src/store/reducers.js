import { combineReducers } from 'redux'
import auth from './Auth/ReducerAuth'
import registration from './Registration/ReducerRegistration'
import card from './CreditCard/ReducerCreditCard'

const rootReducers = combineReducers({
  auth,
  registration,
  card,
})

export default rootReducers
