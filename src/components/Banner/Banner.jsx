import React from 'react'
import Button from '../Button/Button'

const Banner = () => {
  return (
    <div className='banner-container'>
      <div className='banner-container__darkener'>
        <div className='banner-content'>
            <h2 className='banner-content__heading'>Test assignment for front-end developer</h2>
            <p className='banner-content__text'>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
            <Button name="Sign up"/>
        </div>
      </div>
    </div>
  )
}

export default Banner