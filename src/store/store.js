import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducers from './reducers'
import rootSaga from './sagas'
import { initApp } from './mainActions'
const persistConfig = {
  key: 'taxi',
  storage,
}

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
)
export const persistor = persistStore(store, null, () => {
  store.dispatch(initApp())
})

sagaMiddleware.run(rootSaga)
