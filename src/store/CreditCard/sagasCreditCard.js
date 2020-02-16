import { all, call, put, select, takeLatest } from 'redux-saga/effects'
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
  } catch (error) {
    // todo если неудалась загрузка карты ничего страшного
  }
}

function* fetchCardUpdate(action) {
  try {
    if (action.payload) {
      const {
        auth: {
          user: { token },
        },
      } = yield select()

      const cardResult = yield call(saveCardInformation, {
        ...action.payload,
        token,
      })

      if (cardResult.success === true) {
        yield put(updateCardData(action.payload))
      } else {
        const { error } = cardResult
        yield put(updateCardError(error))
      }
    }
  } catch (error) {
    yield put(updateCardError(error))
  }
}

function* watchCardRequest() {
  yield all([
    yield takeLatest(loadCard, fetchLoadCard),
    yield takeLatest(updateCardRequest, fetchCardUpdate),
  ])
}

export default watchCardRequest
