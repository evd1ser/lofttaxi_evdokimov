import React from "react"
import "../styles/App.scss"
import {
  AuthPage,
  OrderPage,
  ProfilePage,
} from "../pages"
import Cookies from "js-cookie"

import { ThemeProvider } from "@material-ui/core"
import { theme } from "loft-taxi-mui-theme"

function App() {
  let defRoute = Cookies.get("route") || "auth"

  const [route, setRoute] = React.useState(defRoute)
  let ChComponent = <div/>


  const switchRoute = (routeName) => {
    Cookies.set("route", routeName)
    setRoute(routeName)
  }

  switch (route) {
    case "order":
      ChComponent = <OrderPage switchRoute={switchRoute}/>
      break
    case "profile":
      ChComponent = <ProfilePage switchRoute={switchRoute}/>
      break
    case "auth":
      ChComponent = <AuthPage switchRoute={switchRoute}/>
      break
    default:
      ChComponent = <div/>
  }


  return (
    <ThemeProvider theme={theme}>
      {ChComponent}
    </ThemeProvider>
  )
}

export default App
