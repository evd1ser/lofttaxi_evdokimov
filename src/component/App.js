import React from 'react'
import '../styles/App.scss'
import { AuthContextProvider } from '../context/AuthContext'

import { ThemeProvider } from '@material-ui/core'
import { theme } from 'loft-taxi-mui-theme'
import Router from './Router'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
