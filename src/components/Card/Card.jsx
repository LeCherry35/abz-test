import React from 'react';
import defaultAvatar from '../../img/photo-cover.svg';
import PropTypes from 'prop-types';

const Card = ({name, email, photo, position, phone}) => {

	Card.propTypes = {
		name: PropTypes.string,
		email: PropTypes.string,
		photo: PropTypes.string,
		position: PropTypes.string,
		phone: PropTypes.string,
	};

	return (
		<div className='card-container'>
			<div className='card-container__avatar'>
				<img src={photo || defaultAvatar} alt="avatar"/>
			</div>
			<p className='text truncatedText' title={name}>{name}</p>
			<div className='card-container__info'>
				<p className='text truncatedText' title={position}>{position}</p>
				<p className='text truncatedText' title={email}>{email}</p>
				<p className='text truncatedText' title={phone}>{phone}</p>
			</div>
		</div>
	);
};

export default Card;