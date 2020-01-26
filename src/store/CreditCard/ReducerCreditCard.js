import { handleActions } from 'redux-actions'
import { updateCardData, updateCardError } from './ActionCreditCard'
import { logout } from '../Auth/ActionAuth'

const initialState = {
  isLoading: false,
  error: null,
  data: {
    cardNumber: '',
    expiryDate: '',
    cardName: '',
    cvc: '',
  },
}

const ReducerCreditCard = handleActions(
  {
    [updateCardData]: (state, action) => {
      return {
        isLoading: false,
        error: null,
        data: {
          ...action.payload,
        },
      }
    },
    [logout]: () => {
      return {
        ...initialState,
      }
    },
    [updateCardError]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload.message,
        ...state,
      }
    },
  },
  initialState
)
export default ReducerCreditCard
