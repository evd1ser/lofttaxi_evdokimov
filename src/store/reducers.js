import { combineReducers } from 'redux'
import auth from './Auth/ReducerAuth'
import registration from './Registration/ReducerRegistration'
import card from './CreditCard/ReducerCreditCard'
import { reducer as formReducer } from 'redux-form'

const rootReducers = combineReducers({
  auth,
  registration,
  card,
  form: formReducer,
})

export default rootReducers
