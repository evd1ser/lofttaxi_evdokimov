import { call, put, takeLatest } from 'redux-saga/effects'
import { login } from './ActionAuth'
import { loginRequest } from '../../helpers/api'

function* fetchSearch(action) {
  try {
    const searchResult = yield call(Api.search, action.payload)
    yield put(searchSuccess(searchResult))
  } catch (error) {
    yield put(searchFailure(error))
  }
}

function* searchRequestWatch() {
  yield takeLatest(searchRequest, fetchSearch)
}

export default searchRequestWatch
