import React, { Component } from "react"
import AuthForm from "../component/AuthForm"
import RegistrationForm from "../component/RegistrationForm"
import { Container, Grid } from "@material-ui/core"
import { Logo } from "loft-taxi-mui-theme"

require("../styles/AuthPage.scss")

class AuthPage extends Component {
  state = {
    login: true,
  }

  changeState(login) {
    this.setState({
      login,
    })
  }

  renderAuth() {
    return <AuthForm onChange={() => {
      this.changeState(false)
    }}
                     onChangeRoute={this.props.switchRoute}/>
  }

  renderRegistration() {
    return <RegistrationForm onChange={() => {
      this.changeState(true)
    }}
                             onChangeRoute={this.props.switchRoute}/>
  }

  render() {
    return (
      <div className="a-page">
        <Container>
          <Grid container
                spacing={3}
                alignItems="center"
          >
            <Grid item xs={6} style={{textAlign: "center"}}>
              <Logo
                white
              />
            </Grid>
            <Grid item xs={5}>
              {this.state.login ? this.renderAuth() : this.renderRegistration()}
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

export { AuthPage }
export default AuthPage
