import React from "react"

const Input = ({label, name, type = "text", value, onChange}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange}/>
    </div>
  )
}

export default Input
