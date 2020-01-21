import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import AuthForm from '../component/AuthForm'
import { AuthContextProvider } from '../context/AuthContext'

describe('AuthForm', () => {
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
          <AuthForm onChangeRoute={onChangeRoute} />
        </AuthContextProvider>
      )

      const inputName = container.querySelector('#username')
      const inputPassword = container.querySelector('#password')
      const form = container.querySelector('form')
      // const inputPassword = container.querySelector('#password')
      // expect(inputPassword.value).toEqual('')
      fireEvent.change(inputName, { target: { value: adminEmail } })
      fireEvent.change(inputPassword, { target: { value: 'password' } })
      fireEvent.submit(form)

      expect(onChangeRoute.mock.calls.length).toBe(1)
    })

    it('incorrect', () => {
      const { container } = render(
        <AuthContextProvider>
          <AuthForm onChangeRoute={onChangeRoute} />
        </AuthContextProvider>
      )

      const inputName = container.querySelector('#username')
      const inputPassword = container.querySelector('#password')
      const form = container.querySelector('form')
      // const inputPassword = container.querySelector('#password')
      // expect(inputPassword.value).toEqual('')
      fireEvent.change(inputName, { target: { value: adminEmail } })
      fireEvent.change(inputPassword, { target: { value: 'password123' } })
      fireEvent.submit(form)

      expect(onChangeRoute.mock.calls.length).toBe(0)
    })
  })

  it('change form ', () => {
    const { getByText } = render(
      <AuthContextProvider>
        <AuthForm onChangeRoute={onChangeRoute} onChange={onChange} />
      </AuthContextProvider>
    )

    fireEvent.click(getByText(/Зарегистрируйтесь/i))

    expect(onChange.mock.calls.length).toBe(1)
  })

  /*it('have two input', () => {
    const wrapper = shallow(
      <AuthContextProvider>
        <AuthForm onChangeRoute={onChangeRoute} />
      </AuthContextProvider>
    )

    expect(wrapper.find('input').at(1))
  })*/

  it('correct login typing', () => {
    const { container } = render(
      <AuthContextProvider>
        <AuthForm onChangeRoute={onChangeRoute} />
      </AuthContextProvider>
    )
    const inputName = container.querySelector('#username')

    expect(inputName.value).toEqual('')

    fireEvent.change(inputName, { target: { value: adminEmail } })

    expect(inputName.value).toBe(adminEmail)
  })

  it('correct password typing', () => {
    const { container } = render(
      <AuthContextProvider>
        <AuthForm onChangeRoute={onChangeRoute} />
      </AuthContextProvider>
    )
    const inputPassword = container.querySelector('#password')
    const password = 'password'

    expect(inputPassword.value).toEqual('')

    fireEvent.change(inputPassword, { target: { value: password } })

    expect(inputPassword.value).toBe(password)
  })
})
