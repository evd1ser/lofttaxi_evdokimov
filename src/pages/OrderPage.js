import React from "react"
import Header from "../elements/Header"
import { Container } from "@material-ui/core"
import OrderForm from "../component/OrderForm"

require("../styles/OrderPage.scss")

const OrderPage = ({switchRoute}) => {
  return (
    <div className="order-page">
      <Header switchRoute={switchRoute}/>

      <div className="order-page__main">
        <Container>
          <OrderForm/>
        </Container>
      </div>

    </div>
  )
}

export { OrderPage }
export default OrderPage
