import React from 'react'

const Input = ({ placeholder, value }) => {
  return (
    <input className='regInput' type='text' placeholder={placeholder} value={value}/>
  )
}

export default Input