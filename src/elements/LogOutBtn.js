import React from 'react'
import { Button } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'
import PropTypes from 'prop-types'

const LogOutBtn = ({ onClick }) => {
  const context = React.useContext(AuthContext)

  return (
    <Button
      onClick={(e) => {
        context.logout()
        onClick(e)
      }}
    >
      Выйти
    </Button>
  )
}

LogOutBtn.propTypes = {
  onClick: PropTypes.func,
}

LogOutBtn.defaultProps = {
  onClick: () => {},
}

export default LogOutBtn
