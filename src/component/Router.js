import React from 'react'
import Cookies from 'js-cookie'
import { AuthContext } from '../context/AuthContext'
import { AuthPage, OrderPage, ProfilePage } from '../pages'

const Router = () => {
  let defRoute = Cookies.get('route') || 'auth'
  const context = React.useContext(AuthContext)
  const [route, setRoute] = React.useState(defRoute)

  const switchRoute = (routeName) => {
    Cookies.set('route', routeName)
    setRoute(routeName)
  }

  let ChComponent = <AuthPage switchRoute={switchRoute} />

  if (context.isLoggedIn) {
    switch (route) {
      case 'profile':
        ChComponent = <ProfilePage switchRoute={switchRoute} />
        break
      case 'order':
      default:
        ChComponent = <OrderPage switchRoute={switchRoute} />
    }
  }

  return ChComponent
}

export default Router
