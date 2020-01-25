import React, { Component } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'

import '../styles/AuthForm.scss'
import { login } from '../store/Auth/ActionAuth'
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

  render() {
    const { match } = this.props
    const { username, password } = this.state

    return (
      <div className="auth-form">
        <h1 className="auth-form__title">Войти</h1>
        <p className="auth-form__text">
          Новый пользователь?{' '}
          <Link to={`${match.url}/registration`} className="auth-form__link">
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

const mapStateToProps = () => {}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
