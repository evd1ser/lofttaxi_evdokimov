import React, { Component } from "react"
import { Button, Grid, TextField } from "@material-ui/core"

require("../styles/AuthForm.scss")

class AuthForm extends Component {
  state = {
    username: "",
    password: "",
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onChangeRoute('order')
  }

  handleInputChange(e) {
    let name = e.target.name
    let value = e.target.value

    this.setState({
      [name]: value,
    })
  }

  onLinkClick(e) {
    e.preventDefault()
    this.props.onChange()
  }

  render() {
    return (
      <div className="auth-form">
        <h1 className="auth-form__title">Войти</h1>
        <p className="auth-form__text">Новый пользователь? <a href="#reg" className="auth-form__link"
                                                              onClick={(e) => this.onLinkClick(e)}>Зарегистрируйтесь</a>
        </p>
        <form className="auth-form__real" onSubmit={(e) => {
          this.handleSubmit(e)
        }}>
          <div className="auth-form__row">
            <TextField
              className="auth-form__input"
              id="username"
              label="Имя пользователя*"
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => {
                this.handleInputChange(e)
              }}
            />
          </div>
          <div className="auth-form__row">
            <TextField
              className="auth-form__input"
              id="password"
              label="Пароль*"
              type="password"
              name="password"
              value={this.state.password}
              onChange={(e) => {
                this.handleInputChange(e)
              }}
            />
          </div>

          <div className="auth-form__row">
            <Grid container
                  justify="flex-end">
              <Grid item xs={5}>
                <Button type="submit" className="auth-form__btn" variant="contained" color="primary">
                  Войти
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    )
  }
}

export default AuthForm
