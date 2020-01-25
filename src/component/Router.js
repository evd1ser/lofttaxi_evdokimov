import React from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { AuthPage, OrderPage, ProfilePage } from '../pages'
const Router = () => {
  let redirectAuth = null
  let redirectOrder = null

  if (true) {
    redirectAuth = <Redirect to="/auth" />
  } else {
    redirectOrder = <Redirect to="/order" />
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/order" component={OrderPage} />
        <Route path="/profile" component={ProfilePage} />
        {redirectOrder}
        <Route path="/auth" component={AuthPage} />
        {redirectAuth}
        <Route exact path="/" component={AuthPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
