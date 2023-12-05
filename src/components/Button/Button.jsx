import React from "react";

const Button = ({name = '', type='yellow', onClick, disabled=false}) => {
    return (
        <>
            <button className='button' onClick={onClick} disabled={disabled}>{name} </button>
        </>
    )
}
export default Button