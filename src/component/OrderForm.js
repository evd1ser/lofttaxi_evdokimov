import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios'
import PropTypes from 'prop-types'
import MapBoxInput from './MapBoxInput'

window.axios = axios

class OrderForm extends Component {
  state = {
    addressFrom: '',
    addressTo: '',
    availableFrom: [],
    features: [],
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const { style, updateFutures, futures } = this.props

    return (
      <div className="order-page__form" style={style}>
        <form
          className="order-form"
          onSubmit={this.handleSubmit}
          data-testid="form"
        >
          <MapBoxInput
            future={futures['address_from']}
            newPointOnMap={updateFutures}
            name="address_from"
          />
          <MapBoxInput
            label="Куда"
            future={futures['address_to']}
            newPointOnMap={updateFutures}
            name="address_to"
          />
        </form>

        <div className="order-page__form-footer">
          <Button variant="contained" color="primary" fullWidth>
            Вызвать такси
          </Button>
        </div>
      </div>
    )
  }
}

OrderForm.propTypes = {
  updateFutures: PropTypes.func,
  style: PropTypes.object,
  futures: PropTypes.object,
}

OrderForm.defaultProps = {
  updateFutures: () => {},
  style: {},
}

export default OrderForm
