import React from 'react'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { AuthPage, OrderPage, ProfilePage } from '../pages'
import { connect } from 'react-redux'

import PrivateRoute from './PrivateRoute'
import PropTypes from 'prop-types'

const Router = ({ isLogged }) => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          path="/profile"
          isCorrect={isLogged}
          component={ProfilePage}
        />
        <PrivateRoute
          path="/auth"
          to="/order"
          isCorrect={!isLogged}
          component={AuthPage}
        />
        <PrivateRoute
          path="/order"
          isCorrect={isLogged}
          component={OrderPage}
        />

        <Redirect to={isLogged ? '/order' : '/auth'} />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = ({ auth: { isLogged } }) => {
  return {
    isLogged,
  }
}

Router.propTypes = {
  isLogged: PropTypes.bool,
}

export default connect(mapStateToProps)(Router)
