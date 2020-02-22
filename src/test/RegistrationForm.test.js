import React from 'react'

import { render, fireEvent } from '@testing-library/react'
import RegistrationForm from '../component/RegistrationForm'
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

describe('RegistrationForm', () => {
  test('can render with redux with defaults', () => {
    const { getByTestId, getByText } = renderWithRedux(
      <StaticRouter>
        <RegistrationForm />
      </StaticRouter>
    )
    // fireEvent.click(getByText('+'))
    // expect(getByTestId('count-value')).toHaveTextContent('1')
  })
  test('can render with redux with initial state', () => {
    const { getByTestId, getByText } = renderWithRedux(
      <StaticRouter>
        <RegistrationForm />
      </StaticRouter>,
      {
        initialState: {
          registration: {
            isLoading: true,
          },
        },
      }
    )
  })
  test('can render with redux with initial error', () => {
    const errorMessage = 'ужасная ошибка'

    const { getByText } = renderWithRedux(
      <StaticRouter>
        <RegistrationForm />
      </StaticRouter>,
      {
        initialState: {
          registration: {
            isLoading: true,
            error: errorMessage,
          },
        },
      }
    )

    expect(getByText(errorMessage)).toBeTruthy()
  })
  test('can registrate', () => {
    const { getByTestId, getByText } = renderWithRedux(
      <StaticRouter>
        <RegistrationForm />
      </StaticRouter>,
      {
        initialState: {
          registration: {
            isLoading: false,
          },
        },
      }
    )
    fireEvent.change(getByTestId('email'), {
      target: { value: 'demo@test.app' },
    })
    fireEvent.change(getByTestId('name'), {
      target: { value: 'Имя пользователя' },
    })
    fireEvent.change(getByTestId('surname'), {
      target: { value: 'Фамилия пользователя' },
    })
    fireEvent.change(getByTestId('password'), { target: { value: 'password' } })

    fireEvent.submit(getByTestId('form'))

    // expect(getByTestId('count-value')).toHaveTextContent('1')
  })
  test('can registrate isLoading', () => {
    const { getByTestId, getByText } = renderWithRedux(
      <StaticRouter>
        <RegistrationForm />
      </StaticRouter>,
      {
        initialState: {
          registration: {
            isLoading: true,
          },
        },
      }
    )
    fireEvent.change(getByTestId('email'), {
      target: { value: 'demo@test.app' },
    })
    fireEvent.change(getByTestId('name'), {
      target: { value: 'Имя пользователя' },
    })
    fireEvent.change(getByTestId('surname'), {
      target: { value: 'Фамилия пользователя' },
    })
    fireEvent.change(getByTestId('password'), { target: { value: 'password' } })

    fireEvent.submit(getByTestId('form'))

    // expect(getByTestId('count-value')).toHaveTextContent('1')
  })
})
