import React from 'react'
import { Logo } from 'loft-taxi-mui-theme'
import { Button, Grid, Container } from '@material-ui/core'
import LogOutBtn from './LogOutBtn'
import PropTypes from 'prop-types'

import '../styles/Header.scss'

const Header = ({ switchRoute }) => {
  return (
    <header className="header">
      <Container>
        <Grid container alignItems="center" justify="space-between">
          <Grid>
            <Logo />
          </Grid>
          <Grid>
            <Button
              onClick={() => {
                switchRoute('order')
              }}
            >
              Карта
            </Button>
            <Button
              onClick={() => {
                switchRoute('profile')
              }}
            >
              Профиль
            </Button>
            <LogOutBtn
              onClick={() => {
                switchRoute('auth')
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </header>
  )
}
Header.propTypes = {
  switchRoute: PropTypes.func,
}

Header.defaultProps = {
  switchRoute: () => {},
}
export default Header
