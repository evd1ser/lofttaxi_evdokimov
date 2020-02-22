import React from 'react'

import { render, fireEvent } from '@testing-library/react'
import AuthForm from '../component/AuthForm'
import { store } from '../store/store'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import reducer from '../store/reducers.js'

jest.mock('gsap/all', () => ({
  TweenMax: {
    to: () => {},
    set: () => {},
  },
}))

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

describe('AuthForm', () => {
  test('can render with redux with defaults', () => {
    const { getByTestId, getByText } = renderWithRedux(
      <StaticRouter>
        <AuthForm />
      </StaticRouter>
    )
    // fireEvent.click(getByText('+'))
    // expect(getByTestId('count-value')).toHaveTextContent('1')
  })
  test('success login', () => {
    const { getByTestId, getByText } = renderWithRedux(
      <StaticRouter>
        <AuthForm />
      </StaticRouter>
    )
    /*fireEvent.change(getByTestId('email'), {
      target: { value: 'demo@test.app' },
    })
    fireEvent.change(getByTestId('password'), { target: { value: 'password' } })
*/
    fireEvent.submit(getByTestId('form'))
  })
})
