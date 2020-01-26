import React, { useEffect, useState } from 'react'
import AuthForm from '../component/AuthForm'
import RegistrationForm from '../component/RegistrationForm'
import { Container, Grid } from '@material-ui/core'
import { Logo } from 'loft-taxi-mui-theme'
import { Route, Switch } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import '../styles/AuthPage.scss'

const AuthPage = ({ match }) => {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    setShowMessage(true)
  })

  return (
    <div className="a-page">
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <CSSTransition
              in={showMessage}
              timeout={500}
              classNames="alert"
              unmountOnExit
              onEnter={() => {}}
              onExited={() => {}}
            >
              <Logo white />
            </CSSTransition>
          </Grid>
          <CSSTransition
            in={showMessage}
            timeout={500}
            classNames="page-auth"
            unmountOnExit
          >
            <Grid item xs={5} style={{ position: 'relative' }}>
              <Route path={`${match.path}/registration`} exact>
                {({ match, ...props }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={500}
                    classNames="page-auth"
                    unmountOnExit
                  >
                    <div className="page-auth">
                      <RegistrationForm match={match} {...props} />
                    </div>
                  </CSSTransition>
                )}
              </Route>
              <Route path={`${match.path}/`} exact>
                {({ match, ...props }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={500}
                    classNames="page-auth"
                    unmountOnExit
                  >
                    <div className="page-auth">
                      <AuthForm match={match} {...props} />
                    </div>
                  </CSSTransition>
                )}
              </Route>
            </Grid>
          </CSSTransition>
        </Grid>
      </Container>
    </div>
  )
}

export { AuthPage }
