import React, { Component } from 'react'
import { Button, Grid, LinearProgress, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'

import '../styles/AuthForm.scss'
import { loginRequest } from '../store/Auth/ActionAuth'
import { connect } from 'react-redux'

class AuthForm extends Component {
  state = {
    username: '',
    password: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { username, password } = this.state

    this.props.login(username, password)
  }

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value,
    })

  renderErrorMessage = (message) => {
    return <div>{message}</div>
  }

  render() {
    const { match, errorMessage, isLoading } = this.props
    const { username, password } = this.state

    const renderer = errorMessage ? this.renderErrorMessage(errorMessage) : null
    const rendererProgress = isLoading ? (
      <div className="auth-form__progress">
        <LinearProgress />
      </div>
    ) : null

    return (
      <div className="auth-form">
        <h1 className="auth-form__title">Войти</h1>
        <p className="auth-form__text">
          Новый пользователь?{' '}
          <Link to={`/auth/registration`} className="auth-form__link">
            Зарегистрируйтесь
          </Link>
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
                  disabled={isLoading}
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
          {renderer}
          {rendererProgress}
        </form>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  errorMessage: store.auth.error,
  isLoading: store.auth.isLoading,
})
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(loginRequest(email, password))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
