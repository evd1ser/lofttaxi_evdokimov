import React from 'react'
import AuthForm from '../component/AuthForm'
import RegistrationForm from '../component/RegistrationForm'
import { Container, Grid } from '@material-ui/core'
import { Logo } from 'loft-taxi-mui-theme'
import { Route, Switch } from 'react-router-dom'

import '../styles/AuthPage.scss'

const AuthPage = ({ match }) => {
  return (
    <div className="a-page">
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <Logo white />
          </Grid>
          <Grid item xs={5}>
            <Switch>
              <Route
                path={`${match.path}/registration`}
                component={RegistrationForm}
              />
              <Route path={`${match.path}/`} component={AuthForm} />
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export { AuthPage }
