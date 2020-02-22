import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Header from '../elements/Header'
import { StaticRouter } from 'react-router-dom'
import { store } from '../store/store'
import { Provider } from 'react-redux'

describe('Header', () => {
  test('render correctly', () => {
    render(
      <Provider store={store}>
        <StaticRouter>
          <Header />
        </StaticRouter>
      </Provider>
    )
  })
})
