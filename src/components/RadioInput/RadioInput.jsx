import React from 'react'

const RadioInput = ({options=[]}) => {
  return (
    <div className='radioInputsContainer'>
        {options?.map((option, id) => {
          return (
            <label htmlFor={'input_' + id} className='radioInput' key={option.id}>
              <input id={'input_' + id} type='radio' value={option.id} />
              {option.name}
            </label>
          )
          })}
    </div>
  )
}

export default RadioInput