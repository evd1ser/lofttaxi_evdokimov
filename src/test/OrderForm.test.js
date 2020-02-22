import React from 'react'

import { render, fireEvent } from '@testing-library/react'
import OrderForm from '../component/OrderForm'

jest.mock('gsap/all', () => ({
  TweenMax: {
    to: () => {},
    set: () => {},
  },
}))

describe('OrderForm', () => {
  test('render correctly', () => {
    render(
      <OrderForm
        newPointOnMap={() => {}}
        futures={{
          address_from: {
            id: 0,
            plate_title: '123',
          },
        }}
      />
    )
  })
  test('submit form', () => {
    const { getByTestId } = render(
      <OrderForm
        newPointOnMap={() => {}}
        futures={{
          address_from: {
            id: 0,
            plate_title: '123',
          },
        }}
      />
    )

    fireEvent.submit(getByTestId('form'))
  })
})
