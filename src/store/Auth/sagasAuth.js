import { call, put, takeLatest } from 'redux-saga/effects'
import { loginRequest, login, loginError, loginStart } from './ActionAuth'
import { loginRequest as loginRequestApi } from '../../helpers/api'

function* fetchLogin(action) {
  try {
    yield call(loginStart, action.payload)

    const searchResult = yield call(loginRequestApi, action.payload)

    if (searchResult.success) {
      const { token } = searchResult
      yield put(login(action.payload.email, token))
    } else {
      const { error } = searchResult
      yield put(loginError(error))
    }
  } catch (error) {
    yield put(loginError(error))
  }
}

function* watchLoginRequest() {
  yield takeLatest(loginRequest, fetchLogin)
}

export default watchLoginRequest
