import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Grid } from '@material-ui/core'
import RenderTextField from './RenderTextField'

let AuthSingleForm = ({
  handleSubmit,
  isLoading,
  renderer,
  rendererProgress,
  ...rest
}) => {
  return (
    <form
      className="auth-form__real"
      onSubmit={handleSubmit}
      data-testid={rest['data-testid']}
    >
      <div className="auth-form__row">
        <Field
          component={RenderTextField}
          className="auth-form__input"
          label="Имя пользователя*"
          type="text"
          name="username"
          data-testid="email"
        />
      </div>
      <div className="auth-form__row">
        <Field
          component={RenderTextField}
          className="auth-form__input"
          label="Пароль*"
          type="password"
          name="password"
          data-testid="password"
        />
      </div>

      <div className="auth-form__row">
        <Grid container justify="flex-end">
          <Grid item xs={5}>
            <Button
              disabled={isLoading}
              type="submit"
              className="auth-form__btn"
              variant="contained"
              color="primary"
            >
              Войти
            </Button>
          </Grid>
        </Grid>
      </div>
      {renderer}
      {rendererProgress}
    </form>
  )
}

AuthSingleForm = reduxForm({
  //уникальое имя для формы
  form: 'auth_form',
})(AuthSingleForm)

export default AuthSingleForm
