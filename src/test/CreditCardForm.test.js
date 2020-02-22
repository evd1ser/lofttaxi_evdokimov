import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import CreditCardForm from '../elements/CreditCardForm'
import { createStore } from 'redux'
import reducer from '../store/reducers'
import { Provider } from 'react-redux'

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

describe('CreditCardForm', () => {
  test('render correctly', () => {
    renderWithRedux(<CreditCardForm />)
  })
  test('click on reset card btn', () => {
    const { getByTestId } = renderWithRedux(<CreditCardForm />)

    fireEvent.click(getByTestId('icon-btn'))
  })
})
