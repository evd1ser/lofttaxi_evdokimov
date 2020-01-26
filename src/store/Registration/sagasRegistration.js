import { call, put, takeLatest } from 'redux-saga/effects'
import { login } from '../Auth/ActionAuth'
import { registrationRequest, registrationError } from './ActionRegistration'

import { registrationRequestApi } from '../../helpers/api'

function* fetchRegistration(action) {
  try {
    const registrationResult = yield call(
      registrationRequestApi,
      action.payload
    )

    if (registrationResult.success) {
      // проверка успешен ли запрос
      const { token } = registrationResult // получаем токен
      yield put(login(action.payload.email, token)) // авторизовываем пользователя на сайте
    } else {
      const { error } = registrationResult
      yield put(registrationError(error)) // ошибка регистрации
    }
  } catch (error) {
    yield put(registrationError(error))
  }
}

function* watchRegistrationRequest() {
  yield takeLatest(registrationRequest, fetchRegistration)
}

export default watchRegistrationRequest
