import React, { Component } from 'react'
import Header from '../elements/Header'
import { Container, Grid, LinearProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { updateCardRequest } from '../store/CreditCard/ActionCreditCard'
import '../styles/ChangeCard.scss'
import PropTypes from 'prop-types'
import CreditCardForm from '../elements/CreditCardForm'

class ProfilePageComponent extends Component {
  updateCardData = (value) => {
    console.log(value)
    this.props.updateCard(value)
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
    const { isLoading, errorMessage, className, card } = this.props
    const { error, success, ...cardData } = card

    const renderer = errorMessage ? this.renderErrorMessage(errorMessage) : null
    const rendererProgress = isLoading ? this.renderLoadIndication() : null

    return (
      <div className={`change-page ${className}`}>
        <Header />

        <div className="change-page__main">
          <Container>
            <Grid container justify="center">
              <Grid item xs={12} md={10}>
                <CreditCardForm
                  onSubmit={this.updateCardData}
                  initialValues={cardData}
                  enableReinitialize={true}
                />
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

ProfilePageComponent.propTypes = {
  card: PropTypes.object,
  isLoading: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  updateCard: PropTypes.func,
}

const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePageComponent)

export { ProfilePage }
