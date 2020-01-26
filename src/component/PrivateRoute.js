import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
  component: Component,
  to = '/auth',
  isCorrect = false,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isCorrect === true ? <Component {...props} /> : <Redirect to={to} />
    }
  />
)

export default PrivateRoute
