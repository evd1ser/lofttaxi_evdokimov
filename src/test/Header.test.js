import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Header from '../elements/Header'
import { AuthContextProvider } from '../context/AuthContext'

describe('Header', () => {
  let switchRoute = () => {}
  let name = ''

  beforeEach(() => {
    name = ''
    switchRoute = jest.fn((newName) => {
      name = newName
    })
  })

  it('click on btn Карта', () => {
    const { getByText } = render(<Header switchRoute={switchRoute} />)

    fireEvent.click(getByText(/Карта/i))

    expect(name).toBe('order')
  })

  it('click on btn Профиль', () => {
    const { getByText } = render(<Header switchRoute={switchRoute} />)

    fireEvent.click(getByText(/Профиль/i))

    expect(name).toBe('profile')
  })
  it('click on btn log out', () => {
    const { getByText } = render(
      <AuthContextProvider>
        <Header switchRoute={switchRoute} />
      </AuthContextProvider>
    )

    fireEvent.click(getByText(/Выйти/i))

    expect(name).toBe('auth')
  })
  it('click on btn log out', () => {
    const { getByText } = render(
      <AuthContextProvider>
        <Header />
      </AuthContextProvider>
    )

    fireEvent.click(getByText(/Выйти/i))
  })
})
