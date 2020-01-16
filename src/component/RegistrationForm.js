import React, { Component } from "react"
import { Button, Grid, TextField } from "@material-ui/core"

class RegistrationForm extends Component {
  state = {
    email: "",
    name: "",
    surname: "",
    password: "",
  }

  handleSubmit(e) {
    e.preventDefault()
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
        <h1 className="auth-form__title">Регистрация</h1>
        <p className="auth-form__text">Уже зарегистрирован? <a href="#auth" className="auth-form__link" onClick={(e) => this.onLinkClick(e)}>Войти</a>
        </p>
        <form className="auth-form__real"
              onSubmit={(e) => {
                this.handleSubmit(e)
              }}>
          <div className="auth-form__row">
            <TextField
              className="auth-form__input"
              label="Адрес электронной почты"
              name="email"
              type="text"
              value={this.state.email}
              onChange={(e) => {
                this.handleInputChange(e)
              }}
            />
          </div>
          <div className="auth-form__row">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  className="auth-form__input"
                  label="Имя"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={(e) => {
                    this.handleInputChange(e)
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className="auth-form__input"
                  label="Фамилия"
                  name="surname"
                  type="text"
                  value={this.state.surname}
                  onChange={(e) => {
                    this.handleInputChange(e)
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <div className="auth-form__row">
            <TextField
              className="auth-form__input"
              label="Пароль"
              name="password"
              type="password"
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
                <Button className="auth-form__btn" variant="contained" color="primary">
                  Зарегистрироваться
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
  )
  }
  }

  export default RegistrationForm
