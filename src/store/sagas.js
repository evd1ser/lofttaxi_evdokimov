import { all, put, takeLatest, select } from 'redux-saga/effects'
import watchLoginRequest from './Auth/sagasAuth'
import watchRegistrationRequest from './Registration/sagasRegistration'
import watchCardRequest from './CreditCard/sagasCreditCard'
import { loadCard } from './CreditCard/ActionCreditCard'
import { login } from './Auth/ActionAuth'

function* fetchLoginUser(action) {
  const state = yield select()
  yield put(loadCard(state.auth.user.token))
}

function* watchLogin() {
  yield takeLatest(login, fetchLoginUser)
}

export default function* rootSaga() {
  // ставим просмотр всех необходимых саг
  yield all([
    watchLogin(),
    watchLoginRequest(),
    watchRegistrationRequest(),
    watchCardRequest(),
  ])
}
