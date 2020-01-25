import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { login } from '../store/Auth/ActionAuth'
import { connect } from 'react-redux'

const AuthContext = React.createContext()
const { Provider: AuthProvider, Consumer } = AuthContext

// Примечание: ещё вы можете использовать хуки, чтобы определять состояние
// и преобразовывать его в функциональный компонент
class AuthContextProvider extends Component {
  state = {
    isLoggedIn: Cookies.get('auth') || false,
  }
  login = (email, password) => {
    const { login } = this.props
    login(email, password)
  }
  logout = () => {
    this.setState({
      isLoggedIn: false,
    })
  }

  render() {
    return (
      <AuthProvider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthProvider>
    )
  }
}

export { AuthContextProvider, Consumer as AuthContextConsumer, AuthContext }
