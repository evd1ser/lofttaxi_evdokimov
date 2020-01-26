import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  loadCard,
  updateCardData,
  updateCardError,
  updateCardRequest,
} from './ActionCreditCard'
import { getCardInformation, saveCardInformation } from '../../helpers/api'

function* fetchLoadCard(action) {
  try {
    if (action.payload) {
      const cardResult = yield call(getCardInformation, action.payload)
      if (cardResult) {
        const { id, ...cardData } = cardResult
        yield put(updateCardData(cardData))
      }
    }
  } catch (error) {}
}

function* fetchCardUpdate(action) {
  try {
    if (action.payload) {
      const cardResult = yield call(saveCardInformation, action.payload)

      if (cardResult.success) {
        yield put(updateCardData(action.payload))
      } else {
        const { error } = cardResult
        yield put(updateCardError(error))
      }
    }
  } catch (error) {}
}

function* watchCardRequest() {
  yield all([
    yield takeLatest(loadCard, fetchLoadCard),
    yield takeLatest(updateCardRequest, fetchCardUpdate),
  ])
}

export default watchCardRequest
