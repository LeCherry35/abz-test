import React, { useRef, useState } from 'react'

const Input = ({ placeholder, value, onChange, error }) => {

  return (
    <div className='text-input-container'>
    {value && <div className='text-input-container__input-name'>{placeholder}</div>}
    <input className={error ? ' text-input-container__input text-input-container__input_warning' : 'text-input-container__input' } type='text' placeholder={placeholder} value={value} onChange={onChange}/>
    <div  className='text-input-container__warning-text'>{error}</div>
    </div>
  )
}

export default Input