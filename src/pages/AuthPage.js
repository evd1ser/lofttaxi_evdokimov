import React, { Component } from 'react'
import AuthForm from '../component/AuthForm'
import RegistrationForm from '../component/RegistrationForm'
import { Container, Grid } from '@material-ui/core'
import { Logo } from 'loft-taxi-mui-theme'
import PropTypes from 'prop-types'

import '../styles/AuthPage.scss'

class AuthPage extends Component {
  state = {
    login: true,
  }

  changeState(login) {
    this.setState({
      login,
    })
  }

  renderAuth() {
    const { switchRoute } = this.props

    return (
      <AuthForm
        onChange={() => {
          this.changeState(false)
        }}
        onChangeRoute={switchRoute}
      />
    )
  }

  renderRegistration() {
    const { switchRoute } = this.props

    return (
      <RegistrationForm
        onChange={() => {
          this.changeState(true)
        }}
        onChangeRoute={switchRoute}
      />
    )
  }

  render() {
    const { login } = this.state
    const renderer = login ? this.renderAuth() : this.renderRegistration()

    return (
      <div className="a-page">
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <Logo white />
            </Grid>
            <Grid item xs={5}>
              {renderer}
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

AuthPage.propTypes = {
  switchRoute: PropTypes.func.isRequired,
}

export { AuthPage }
