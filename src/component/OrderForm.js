import React, { Component } from "react"
import { Button, TextField } from "@material-ui/core"

class OrderForm extends Component {
  state = {
    addressFrom: "",
    addressTo: "",
    countOnRoad: 1,
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const {countOnRoad} = this.state
    let arrayOnRoad = []
    arrayOnRoad.length = countOnRoad
    arrayOnRoad.fill(countOnRoad)

    return (
      <div className="order-page__form">
        <form className="order-form" onSubmit={(e) => {
          this.handleSubmit(e)
        }}>
          <div className="order-form__item">
            <div className="order-form__icon">
              <img src={require('../assets/icons/map_from.svg')} alt=""/>
            </div>
            <div className="order-form__wrap">
              <TextField
                className="order-form__input"

                label="Откуда"
                type="text"
                name="addressFrom"
                value={this.state.addressFrom}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          {arrayOnRoad.map((item, index) => {
            return <div key={index}
                        className="order-form__item">
              <div className="order-form__icon">
                <img src={require('../assets/icons/map_to.svg')} alt=""/>
              </div>
              <div className="order-form__wrap">
                <TextField
                  className="order-form__input"
                  label="Куда"
                  type="text"
                  name="addressTo[]"
                  value={this.state.addressTo}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          })}

        </form>

        <div className="order-page__form-footer">
          <Button variant="contained" color="primary" fullWidth={true}>Вызвать такси</Button>
        </div>
      </div>
    )
  }
}

export default OrderForm
