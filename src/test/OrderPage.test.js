import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { OrderPage } from '../pages/OrderPage'
import { createStore } from 'redux'
import reducer from '../store/reducers'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { getAvailableFeaturesBy } from '../helpers/mapHelpers'

jest.mock('../helpers/mapHelpers')
jest.mock('mapbox-gl/dist/mapbox-gl.js', () => ({
  Map: class {
    getLayer(layer) {
      return ['route'].includes(layer)
    }
    removeLayer(layer) {}
    getSource(source) {
      return ['route'].includes(source)
    }
    removeSource() {}
    remove() {}
    addControl() {}
    on() {}
  },
}))
jest.mock('gsap/all', () => ({
  TweenMax: {
    to: () => {},
    set: () => {},
  },
}))

function renderWithRoot(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <StaticRouter>{ui}</StaticRouter>
      </Provider>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

describe('OrderForm', () => {
  test('render correctly', () => {
    renderWithRoot(<OrderPage />)
  })
  test('render update', async () => {
    getAvailableFeaturesBy.mockResolvedValue([{ id: 1, place_name: '111' }])

    const { container, getByText } = renderWithRoot(
      <OrderPage className="test-class" />
    )

    await act(async () => {
      fireEvent.change(container.querySelector('.js-input-test'), {
        target: { value: 'new value' },
      })
    })
  })
})
