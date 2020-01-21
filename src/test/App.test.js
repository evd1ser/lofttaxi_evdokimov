import React from 'react'
import { render } from '@testing-library/react'
import App from '../component/App'

jest.mock('mapbox-gl/dist/mapbox-gl.js', () => ({
  Map: () => ({}),
}))

describe('App', () => {
  test('render correctly', () => {
    render(<App />)
  })
})
