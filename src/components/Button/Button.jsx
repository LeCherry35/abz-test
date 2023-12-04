import React from "react";

const Button = ({name = '', type='yellow', onClick}) => {
    return (
        <>
            <button className='button' onClick={onClick}>{name} </button>
        </>
    )
}
export default Button