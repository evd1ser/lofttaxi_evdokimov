import React from 'react'
import Header from '../elements/Header'
import { Container } from '@material-ui/core'
import OrderForm from '../component/OrderForm'
import Map from '../component/Map'
import '../styles/OrderPage.scss'
import PropTypes from 'prop-types'

const OrderPage = ({ className }) => {
  const [futures, setFutures] = React.useState({})

  return (
    <div className={`order-page ${className}`}>
      <Header />

      <div className="order-page__main">
        <Container
          style={{
            pointerEvents: 'none',
          }}
        >
          <OrderForm
            style={{
              pointerEvents: 'auto',
            }}
            futures={futures}
            updateFutures={(future, name) => {
              setFutures({
                ...futures,
                [name]: future,
              })
            }}
          />
        </Container>

        <Map
          futures={futures}
          updateFutures={(future, name) => {
            setFutures({
              ...futures,
              [name]: future,
            })
          }}
        />
      </div>
    </div>
  )
}

OrderPage.propTypes = {
  className: PropTypes.string,
}

export { OrderPage }
