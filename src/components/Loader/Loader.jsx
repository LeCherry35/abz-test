import React from 'react';
import loaderImage from '../../img/preloader.svg';


const Loader = () => {
	return (
		<div className='loader-container'><img className='loader-container__rotate' src={loaderImage} alt='Loading...'/></div>
	);
};

export default Loader;