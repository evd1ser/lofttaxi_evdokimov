import React, { Component } from 'react'
import Header from '../elements/Header'
import {
  Button,
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { MCIcon } from 'loft-taxi-mui-theme'
import { maskJs } from 'mask-js'

import '../styles/ChangeCard.scss'
import PropTypes from 'prop-types'

class ProfilePage extends Component {
  state = {
    showCVC: false,
    cardNo: '',
    dateExp: '',
    name: '',
    cvc: '',
  }

  clearCardNo = () => {
    this.setState({
      cardNo: '',
    })
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    })
  }

  handleInputChangeMask = (mask) => {
    return ({ target: { name, value } }) => {
      let newVal = maskJs(mask, value)

      this.handleInputChange({ target: { name, value: newVal } })
    }
  }

  render() {
    const { cardNo, dateExp, name, cvc } = this.state
    const { switchRoute } = this.props

    return (
      <div className="change-page">
        <Header switchRoute={switchRoute} />

        <div className="change-page__main">
          <Container>
            <Grid container justify="center">
              <Grid item xs={12} md={10}>
                <form className="change-card">
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
                            <Input
                              id="standard-adornment-password"
                              value={cardNo}
                              name="cardNo"
                              onChange={this.handleInputChangeMask(
                                '9999 9999 9999 9999'
                              )}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.clearCardNo}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </div>
                        <div className="card__wrapper">
                          <TextField
                            label="Срок действия:"
                            type="text"
                            name="dateExp"
                            value={dateExp}
                            onChange={this.handleInputChangeMask('99/99')}
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className="card">
                        <div className="card__wrapper">
                          <TextField
                            className="card__input"
                            label="Имя владельца:"
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleInputChange}
                          />
                        </div>

                        <div className="card__wrapper">
                          <TextField
                            label="CVC:"
                            type="password"
                            name="cvc"
                            value={cvc}
                            onChange={this.handleInputChangeMask('999')}
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
                    <Button variant="contained" color="primary">
                      Сохранить
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  switchRoute: PropTypes.func.isRequired,
}

export { ProfilePage }
