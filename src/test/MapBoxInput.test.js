import React from 'react'
import MapBoxInput from '../component/MapBoxInput'
import { render, fireEvent } from '@testing-library/react'

describe('MapBoxInput', () => {
  it('render', () => {
    render(<MapBoxInput />)
  })
  it('render with props', () => {
    const props = {
      label: 'Куда нужно',
      name: 'name_of_input',
      newPointOnMap: () => {},
      future: {},
    }
    const { getByText } = render(<MapBoxInput {...props} />)

    const items = getByText(/Куда нужно/)
    expect(items).toHaveLength(10)
  })
})
