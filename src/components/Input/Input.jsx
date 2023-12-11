import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ placeholder, value, onChange, error }) => {
  
	Input.propTypes = {
		placeholder: PropTypes.string,
		value: PropTypes.string,
		onChange: PropTypes.func,
		error: PropTypes.string,
	};
	return (
		<div className='text-input-container'>
			{value && <div className={error ? 'text-input-container__input-name text-input-container__input-name_warning' : 'text-input-container__input-name' }>{placeholder}</div>}
			<input className={error ? ' text-input-container__input text-input-container__input_warning' : 'text-input-container__input' } type='text' placeholder={placeholder} value={value} onChange={onChange}/>
			<div  className='text-input-container__warning-text'>{error}</div>
		</div>
	);
};

export default Input;