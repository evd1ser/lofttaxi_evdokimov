import React from 'react'
import '../styles/App.scss'
import { ThemeProvider } from '@material-ui/core'
import { theme } from 'loft-taxi-mui-theme'
import Router from './Router'
import { Provider } from 'react-redux'
import { store, persistor } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
