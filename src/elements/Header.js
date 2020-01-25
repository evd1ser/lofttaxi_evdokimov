import React from 'react'
import { Logo } from 'loft-taxi-mui-theme'
import { Button, Grid, Container } from '@material-ui/core'
import LogOutBtn from './LogOutBtn'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../styles/Header.scss'

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Grid container alignItems="center" justify="space-between">
          <Grid>
            <Logo />
          </Grid>
          <Grid>
            <Button component={Link} to={'/order'}>
              Карта
            </Button>
            <Button component={Link} to={'/profile'}>
              Профиль
            </Button>
            <LogOutBtn />
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
