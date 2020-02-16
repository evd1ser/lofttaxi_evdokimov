import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const PrivateRoute = ({
  component: Component,
  to = '/auth',
  isCorrect = false,
  classNames = 'main-page',
  ...rest
}) => {
  return (
    <Route {...rest}>
      {({ match, ...props }) => {
        return isCorrect === true ? (
          <Component match={match} className={classNames} {...props} />
        ) : (
          <Redirect to={to} />
        )
      }}
    </Route>
  )
}

PrivateRoute.propTypes = {
  // component: PropTypes.element,
  to: PropTypes.string,
  isCorrect: PropTypes.bool,
  classNames: PropTypes.string,
}

export default PrivateRoute
