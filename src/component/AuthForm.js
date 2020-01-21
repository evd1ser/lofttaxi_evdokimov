import React, { Component } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'

import '../styles/AuthForm.scss'

class AuthForm extends Component {
  state = {
    username: '',
    password: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { login } = this.context
    const { username, password } = this.state
    let isCorrect = login(username, password)

    if (isCorrect) {
      this.props.onChangeRoute('order')
    }
  }

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value,
    })

  onLinkClick = (e) => {
    e.preventDefault()
    this.props.onChange()
  }

  render() {
    const { username, password } = this.state

    return (
      <div className="auth-form">
        <h1 className="auth-form__title">Войти</h1>
        <p className="auth-form__text">
          Новый пользователь?{' '}
          <a href="#reg" className="auth-form__link" onClick={this.onLinkClick}>
            Зарегистрируйтесь
          </a>
        </p>
        <form className="auth-form__real" onSubmit={this.handleSubmit}>
          <div className="auth-form__row">
            <TextField
              className="auth-form__input"
              id="username"
              label="Имя пользователя*"
              type="text"
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="auth-form__row">
            <TextField
              className="auth-form__input"
              id="password"
              label="Пароль*"
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="auth-form__row">
            <Grid container justify="flex-end">
              <Grid item xs={5}>
                <Button
                  type="submit"
                  className="auth-form__btn"
                  variant="contained"
                  color="primary"
                >
                  Войти
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    )
  }
}

AuthForm.contextType = AuthContext

export default AuthForm
