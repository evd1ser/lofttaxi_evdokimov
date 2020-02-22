import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Map from '../component/Map'
import { StaticRouter } from 'react-router-dom'
import { store } from '../store/store'
import { Provider } from 'react-redux'

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

describe('Map', () => {
  test('render correctly', () => {
    const updateFutures = jest.fn
    render(
      <Provider store={store}>
        <StaticRouter>
          <Map updateFutures={updateFutures} />
        </StaticRouter>
      </Provider>
    )
  })
})
