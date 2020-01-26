import React from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { AuthPage, OrderPage, ProfilePage } from '../pages'
import { connect } from 'react-redux'

import PrivateRoute from './PrivateRoute'

const Router = ({ isLogged }) => {
  return (
    <BrowserRouter>
      <Switch>
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
        <PrivateRoute
          path="/profile"
          isCorrect={isLogged}
          component={ProfilePage}
        />
        <Route path="/" component={isLogged ? OrderPage : AuthPage} />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = ({ auth: { isLogged } }) => {
  return {
    isLogged,
  }
}

export default connect(mapStateToProps)(Router)
