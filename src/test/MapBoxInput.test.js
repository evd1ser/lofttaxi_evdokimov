import React from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import MapBoxInput from '../component/MapBoxInput'
import { getAvailableFeaturesBy } from '../helpers/mapHelpers'

jest.mock('mapbox-gl/dist/mapbox-gl.js', () => ({
  Map: () => ({}),
}))
jest.mock('gsap/all', () => ({
  TweenMax: {
    to: () => {},
    set: () => {},
  },
}))
jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children)
  const FakeCSSTransition = jest.fn((props) =>
    props.in ? <FakeTransition>{props.children}</FakeTransition> : null
  )
  return { CSSTransition: FakeCSSTransition, Transition: FakeTransition }
})
jest.mock('../helpers/mapHelpers')

beforeAll(() => {
  // we're using fake timers because we don't want to
  // wait a full second for this test to run.
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

describe('MapBoxInput', () => {
  test('render correctly', () => {
    render(<MapBoxInput newPointOnMap={() => {}} />)
  })

  test('render with future ', async () => {
    const newPointOnMap = jest.fn()

    getAvailableFeaturesBy.mockResolvedValue([{ id: 1, place_name: '111' }])

    const { container, getByPlaceholderText, getByText } = render(
      <MapBoxInput
        future={{ title: '123' }}
        updateFutures={() => {}}
        newPointOnMap={newPointOnMap}
      />
    )

    await act(async () => {
      fireEvent.change(getByPlaceholderText('адрес'), {
        target: { value: 'new value' },
      })
    })

    fireEvent.click(getByText('111'))

    expect(newPointOnMap.mock.calls.length).toBe(1)
  })
})
