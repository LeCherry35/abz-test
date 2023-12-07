import React from 'react'
import defaultAvatar from "../../img/photo-cover.svg"

const Card = ({name, email, photo, position, phone}) => {
  return (
    <div className='cardContainer'>
        <div className='avatar'>
            <img src={photo || defaultAvatar} alt="avatar"/>
        </div>
        <p className='text truncatedText' title={name}>{name}</p>
        <div className='info'>
            <p className='text truncatedText' title={position}>{position}</p>
            <p className='text truncatedText' title={email}>{email}</p>
            <p className='text truncatedText' title={phone}>{phone}</p>
        </div>
    </div>
  )
}

export default Card