import { createActions, createAction } from 'redux-actions'

const CardActionCreators = createActions({
  LOAD_CARD: (token) => {
    return token
  },
  UPDATE_CARD_DATA: (cardData) => {
    return cardData
  },
  UPDATE_CARD_REQUEST: (cardData) => {
    return cardData
  },
})

const loadCard = CardActionCreators.loadCard
const updateCardData = CardActionCreators.updateCardData
const updateCardRequest = CardActionCreators.updateCardRequest
const updateCardError = createAction('UPDATE_CARD_ERROR')

export { loadCard, updateCardData, updateCardRequest, updateCardError }
