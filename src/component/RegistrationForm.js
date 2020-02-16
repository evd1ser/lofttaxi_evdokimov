import React, { Component } from 'react'
import { Button, Grid, TextField, LinearProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { registrationRequest } from '../store/Registration/ActionRegistration'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class RegistrationForm extends Component {
  state = {
    email: '',
    name: '',
    surname: '',
    password: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { isLoading } = this.props

    if (!isLoading) {
      this.props.registration(this.state)
    }
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    })
  }

  renderErrorMessage(errorMessage) {
    return <div>{errorMessage}</div>
  }

  render() {
    const { errorMessage, isLoading } = this.props
    const { email, name, surname, password } = this.state

    const renderer = errorMessage ? this.renderErrorMessage(errorMessage) : null
    const rendererProgress = isLoading ? (
      <div className="auth-form__progress">
        <LinearProgress />
      </div>
    ) : null

    return (
      <div className="auth-form">
        <h1 className="auth-form__title">Регистрация</h1>
        <p className="auth-form__text">
          Уже зарегистрирован?{' '}
          <Link to={`/auth`} className="auth-form__link">
            Войти
          </Link>
        </p>
        <form className="auth-form__real" onSubmit={this.handleSubmit}>
          <div className="auth-form__row">
            <TextField
              className="auth-form__input"
              label="Адрес электронной почты"
              name="email"
              type="text"
              value={email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="auth-form__row">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  className="auth-form__input"
                  label="Имя"
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className="auth-form__input"
                  label="Фамилия"
                  name="surname"
                  type="text"
                  value={surname}
                  onChange={this.handleInputChange}
                />
              </Grid>
            </Grid>
          </div>
          <div className="auth-form__row">
            <TextField
              className="auth-form__input"
              label="Пароль"
              name="password"
              type="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="auth-form__row">
            <Grid container justify="flex-end">
              <Grid item xs={5}>
                <Button
                  disabled={isLoading}
                  type={'submit'}
                  className="auth-form__btn"
                  variant="contained"
                  color="primary"
                >
                  Зарегистрироваться
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
  errorMessage: store.registration.error,
  isLoading: store.registration.isLoading,
})

const mapDispatchToProps = (dispatch) => {
  return {
    registration: (userObj) => {
      dispatch(registrationRequest(userObj))
    },
  }
}

RegistrationForm.propTypes = {
  errorMessage: PropTypes.string,
  isLoading: PropTypes.bool,
  registration: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
