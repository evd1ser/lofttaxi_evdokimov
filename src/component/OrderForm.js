import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import mapboxSdk from '@mapbox/mapbox-sdk/umd/mapbox-sdk'
import PropTypes from 'prop-types'
import MapBoxInput from './MapBoxInput'

window.axios = axios

class OrderForm extends Component {
  state = {
    addressFrom: '',
    addressTo: '',
    countOnRoad: 1,
    availableFrom: [],
    features: [],
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const { style, updateFutures, futures } = this.props
    const { countOnRoad, addressTo, addressFrom } = this.state

    let arrayOnRoad = []
    arrayOnRoad.length = countOnRoad
    arrayOnRoad.fill(countOnRoad)

    return (
      <div className="order-page__form" style={style}>
        <form className="order-form" onSubmit={this.handleSubmit}>
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

          {/*
          arrayOnRoad.map((item, index) => {
            return (
              <div key={index} className="order-form__item">
                <div className="order-form__icon">
                  <img src={require('../assets/icons/map_to.svg')} alt="" />
                </div>
                <div className="order-form__wrap">
                  <input type="text" />
                  <TextField
                    className="order-form__input"
                    label="Куда"
                    type="text"
                    name="addressTo[]"
                    value={addressTo}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            )
          })*/}
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
}

OrderForm.defaultProps = {
  updateFutures: () => {},
  style: {},
}

export default OrderForm
