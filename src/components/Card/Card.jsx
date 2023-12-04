import React from 'react'
import defaultAvatar from "../../img/photo-cover.svg"

const Card = ({name, email, photo, position, phone}) => {
  console.log(name, email, photo, position, phone);
  return (
    <div className='cardContainer'>
        <div className='avatar'>
            <img src={photo || defaultAvatar} alt="avatar"/>
        </div>
        <p className='text truncatedText'>{name}</p>
        <div className='info'>
            <p className='text truncatedText'>{position}</p>
            <p className='text truncatedText'>{email}</p>
            <p className='text truncatedText'>{phone}</p>
        </div>
    </div>
  )
}

export default Card