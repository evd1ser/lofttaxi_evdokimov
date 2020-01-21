import React, { Component } from 'react'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

const AuthContext = React.createContext()
const { Provider, Consumer } = AuthContext

// Примечание: ещё вы можете использовать хуки, чтобы определять состояние
// и преобразовывать его в функциональный компонент
class AuthContextProvider extends Component {
  state = {
    isLoggedIn: Cookies.get('auth') || false,
  }
  login = (email, password) => {
    if (email === 'test@admin.com' && password === 'password') {
      Cookies.set('auth', true)

      this.setState({
        isLoggedIn: true,
      })
      return true
    }

    return false
  }
  logout = () => {
    Cookies.remove('auth')
    this.setState({
      isLoggedIn: false,
    })
  }

  render() {
    return (
      <Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AuthContextProvider, Consumer as AuthContextConsumer, AuthContext }
