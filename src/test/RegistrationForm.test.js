import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import RegistrationForm from '../component/RegistrationForm'
import { AuthContextProvider } from '../context/AuthContext'

describe('RegistrationForm', () => {
  const adminEmail = 'test@admin.com'

  let onChangeRoute = () => {}
  let onChange = () => {}
  let name = ''

  beforeEach(() => {
    name = ''
    onChangeRoute = jest.fn((newName) => {
      name = newName
    })
    onChange = jest.fn()
  })

  describe('login', () => {
    it('correct', () => {
      const { container } = render(
        <AuthContextProvider>
          <RegistrationForm onChangeRoute={onChangeRoute} onChange={onChange} />
        </AuthContextProvider>
      )
      const inputEmail = container.querySelector('[name=email]')
      const inputPassword = container.querySelector('[name=password]')
      const inputName = container.querySelector('[name=name]')
      const inputSurname = container.querySelector('[name=surname]')
      const form = container.querySelector('form')

      expect(inputEmail.value).toEqual('')
      expect(inputPassword.value).toEqual('')
      expect(inputName.value).toEqual('')
      expect(inputSurname.value).toEqual('')

      fireEvent.change(inputEmail, { target: { value: adminEmail } })
      fireEvent.change(inputPassword, { target: { value: 'password' } })
      fireEvent.change(inputName, { target: { value: 'Name' } })
      fireEvent.change(inputSurname, { target: { value: 'Surname' } })

      fireEvent.submit(form)

      expect(onChangeRoute.mock.calls.length).toBe(1)
    })
  })

  it('change form', () => {
    const { getByText } = render(
      <AuthContextProvider>
        <RegistrationForm onChangeRoute={onChangeRoute} onChange={onChange} />
      </AuthContextProvider>
    )

    fireEvent.click(getByText(/Войти/i))

    expect(onChange.mock.calls.length).toBe(1)
  })

  it('render without params', () => {
    const { getByText } = render(
      <AuthContextProvider>
        <RegistrationForm />
      </AuthContextProvider>
    )

    fireEvent.click(getByText(/Войти/i))
    fireEvent.click(getByText(/Зарегистрироваться/i))
  })
  it('render without params', () => {
    const { getByText } = render(<RegistrationForm />)

    fireEvent.click(getByText(/Войти/i))
    fireEvent.click(getByText(/Зарегистрироваться/i))
  })
})
