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
  LinearProgress,
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { MCIcon } from 'loft-taxi-mui-theme'
import { maskJs } from 'mask-js'
import { connect } from 'react-redux'
import { updateCardRequest } from '../store/CreditCard/ActionCreditCard'
import '../styles/ChangeCard.scss'

class ProfilePageComponent extends Component {
  state = {
    showCVC: false,
    cardNumber: '',
    expiryDate: '',
    cardName: '',
    cvc: '',
  }
  componentDidMount() {
    const { card } = this.props

    this.setState({
      ...card,
    })
  }

  clearCardNo = () => {
    this.setState({
      cardNumber: '',
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

  updateCardData = () => {
    const { showCVC, ...cardData } = this.state

    this.props.updateCard(cardData)
  }

  renderErrorMessage = (message) => {
    return <div>{message}</div>
  }

  renderLoadIndication = () => {
    return (
      <div className="change-page__progress">
        <LinearProgress />
      </div>
    )
  }

  render() {
    const { isLoading, errorMessage } = this.props
    const { cardNumber, expiryDate, cardName, cvc } = this.state

    const renderer = errorMessage ? this.renderErrorMessage(errorMessage) : null
    const rendererProgress = isLoading ? (
      <div className="auth-form__progress">
        <LinearProgress />
      </div>
    ) : null

    return (
      <div className="change-page">
        <Header />

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
                              value={cardNumber}
                              name="cardNumber"
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
                            name="expiryDate"
                            value={expiryDate}
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
                            name="cardName"
                            value={cardName}
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.updateCardData}
                    >
                      Сохранить
                    </Button>
                  </Grid>
                </form>
                {renderer}
                {rendererProgress}
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, card }) => {
  return {
    token: auth.user.token,
    card: card.data,
    errorMessage: card.error,
    isLoading: card.isLoading,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateCard: (cardObj) => {
      dispatch(updateCardRequest(cardObj))
    },
  }
}
const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePageComponent)
export { ProfilePage }
