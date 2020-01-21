import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LogOutBtn from '../elements/LogOutBtn'
import { AuthContextProvider } from '../context/AuthContext'
// import jest from 'jest'

describe('LogOutBtn', () => {
  it('click on btn', () => {
    const callFn = jest.fn()

    const { getByText } = render(
      <AuthContextProvider>
        <LogOutBtn onClick={callFn} />
      </AuthContextProvider>
    )

    const linkElement = getByText(/Выйти/i)
    fireEvent.click(linkElement)

    expect(callFn.mock.calls.length).toBe(1)
  })

  it('click on btn without callback', () => {
    const { getByText } = render(
      <AuthContextProvider>
        <LogOutBtn />
      </AuthContextProvider>
    )

    const linkElement = getByText(/Выйти/i)
    fireEvent.click(linkElement)

    // expect().toBe(1)
  })

  it('renders logout react', () => {
    const { getByText } = render(<LogOutBtn />)
    const linkElement = getByText(/Выйти/i)
    expect(linkElement).toBeInTheDocument()
  })
})
