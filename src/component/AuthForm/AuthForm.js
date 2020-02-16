import React, { Component } from 'react'
import { Button, Grid, LinearProgress, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../styles/AuthForm.scss'
import { loginRequest } from '../../store/Auth/ActionAuth'
import { connect } from 'react-redux'
import AuthSingleForm from '../../elements/AuthSingleForm'

class AuthForm extends Component {
  handleSubmit = ({ username, password }) => {
    this.props.login(username, password)
  }

  renderErrorMessage = (message) => {
    return <div>{message}</div>
  }

  render() {
    const { errorMessage, isLoading } = this.props

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

        <AuthSingleForm
          onSubmit={this.handleSubmit}
          renderer={renderer}
          isLoading={isLoading}
          rendererProgress={rendererProgress}
        />
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

AuthForm.propTypes = {
  login: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
