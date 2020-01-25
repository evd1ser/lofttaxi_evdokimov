import React from 'react'
import '../styles/App.scss'
import { ThemeProvider } from '@material-ui/core'
import { theme } from 'loft-taxi-mui-theme'
import Router from './Router'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}

export default App
