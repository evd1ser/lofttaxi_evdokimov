import React, { Component } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class RegistrationForm extends Component {
  state = {
    email: '',
    name: '',
    surname: '',
    password: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onChangeRoute()
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { email, name, surname, password } = this.state

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
        </form>
      </div>
    )
  }
}

RegistrationForm.propTypes = {
  onChange: PropTypes.func,
  onChangeRoute: PropTypes.func,
}

RegistrationForm.defaultProps = {
  onChange: () => {},
  onChangeRoute: () => {},
}

export default RegistrationForm
