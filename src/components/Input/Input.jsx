import React from 'react'

const Input = ({ placeholder, value, onChange }) => {
  return (
    <input className='regInput' type='text' placeholder={placeholder} value={value} onChange={onChange}/>
  )
}

export default Input