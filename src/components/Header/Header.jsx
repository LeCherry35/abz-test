import React from 'react'
import Button from "../Button/Button";
import logo from '../../img/Logo.svg'


const Header = ({type = 'desktop'}) => {
  return (
    <header>
        <div className='headerContent container'>
            <img src={logo} alt='logo'/>
            <div className='buttonContainer'>
                <Button name="Users"/>
                <Button name="Sign Up"/>
            </div>
        </div>
    </header>
  )
}

export default Header