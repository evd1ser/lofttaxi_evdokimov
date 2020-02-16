import { Input } from '@material-ui/core'
import React from 'react'

const RenderInputField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <Input
      label={label}
      placeholder={label}
      error={touched && invalid}
      // helperText={touched && error}
      {...input}
      {...custom}
    />
  )
}

export default RenderInputField
