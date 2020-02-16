import React from 'react'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { logout } from '../store/Auth/ActionAuth'
import PropTypes from 'prop-types'

const LogOutBtn = ({ logOut }) => {
  return <Button onClick={logOut}>Выйти</Button>
}
const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logout()),
})

LogOutBtn.propTypes = {
  logOut: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(LogOutBtn)
