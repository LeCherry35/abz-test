import React from 'react'

const RadioInput = ({options=[], setSelected}) => {
  return (
    <div className='radio-inputs-container'>
        {options?.map((option, id) => {
          return (
            <label htmlFor={'input_' + id} className='radio-inputs-container__radio-label' key={option.id}>
              <input 
                className='radio-inputs-container__radio-input' 
                id={'input_' + id} 
                type='radio' 
                value={option.id} 
                name='radioInputs'
                onClick={() => setSelected(option.id)}
              />
              {option.name}
            </label>
          )
          })}
    </div>
  )
}

export default RadioInput