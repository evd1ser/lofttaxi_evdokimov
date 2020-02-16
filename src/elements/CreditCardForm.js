import React from 'react'
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@material-ui/core'
import { MCIcon } from 'loft-taxi-mui-theme'
import { Close as CloseIcon } from '@material-ui/icons'
import { Field, reduxForm, change } from 'redux-form'
import RenderTextField from './RenderTextField'
import RenderInputField from './RenderInputField'
import { maskJs } from 'mask-js'
import { connect } from 'react-redux'

let CreditCardForm = ({ dispatch, handleSubmit, initialValues }) => {
  const formatInputMask = (mask) => {
    return (value) => {
      return maskJs(mask, value)
    }
  }

  return (
    <form className="change-card" onSubmit={handleSubmit}>
      <h1 className="change-page__title">Профиль</h1>
      <p className="change-page__description">Способ оплаты</p>

      <Grid container justify="center" spacing={3}>
        <Grid item xs={12} md={6}>
          <div className="card">
            <div className="card__label">
              <MCIcon />
            </div>
            <div className="card__wrapper">
              <FormControl className="card__input">
                <InputLabel htmlFor="standard-adornment-password">
                  Номер карты:
                </InputLabel>
                <Field
                  component={RenderInputField}
                  className="auth-form__input"
                  name="cardNumber"
                  format={formatInputMask('9999 9999 9999 9999')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          dispatch(change('credit-card-form', 'cardNumber', ''))
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="card__wrapper">
              <Field
                component={RenderTextField}
                className="card__input"
                label="Срок действия:"
                type="text"
                format={formatInputMask('99/99')}
                name="expiryDate"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="card">
            <div className="card__wrapper">
              <Field
                component={RenderTextField}
                className="card__input"
                label="Имя владельца:"
                type="text"
                name="cardName"
              />
            </div>

            <div className="card__wrapper">
              <Field
                component={RenderTextField}
                className="card__input"
                label="CVC:"
                type="password"
                name="cvc"
                format={formatInputMask('999')}
              />
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid
        alignItems="center"
        container
        justify="center"
        style={{
          marginTop: 40,
        }}
      >
        <Button variant="contained" color="primary" type="submit">
          Сохранить
        </Button>
      </Grid>
    </form>
  )
}

CreditCardForm = reduxForm({
  //уникальое имя для формы
  form: 'credit-card-form',
})(CreditCardForm)

/*
// You have to connect() to any reducers that you wish to connect to yourself
CreditCardForm = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  })
)(CreditCardForm)*/

export default CreditCardForm
