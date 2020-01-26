import React from 'react'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { logout } from '../store/Auth/ActionAuth'

const LogOutBtn = ({ logOut }) => {
  return <Button onClick={logOut}>Выйти</Button>
}
const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logout()),
})
export default connect(null, mapDispatchToProps)(LogOutBtn)
