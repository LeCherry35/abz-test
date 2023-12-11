import React from 'react';
import Button from '../Button/Button';
import logo from '../../img/Logo.svg';


const Header = () => {
	return (
		<header className='header-container'>
			<div className='header-content container'>
				<img src={logo} alt='logo'/>
				<div className='header-content__buttons'>
					<Button name="Users"/>
					<Button name="Sign Up"/>
				</div>
			</div>
		</header>
	);
};

export default Header;