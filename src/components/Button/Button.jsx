import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name = '', onClick, disabled = false }) => {
	Button.propTypes = {
		name: PropTypes.string,
		onClick: PropTypes.func,
		disabled: PropTypes.bool,
	};
	return (
		<button className="button" onClick={onClick} disabled={disabled}>
			{name}
			{' '}
		</button>
	);
};
export default Button;
