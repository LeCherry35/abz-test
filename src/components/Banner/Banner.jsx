import React from 'react'
import Button from '../Button/Button'

const Banner = () => {
  return (
    <div className='bannerContainer'>
            <div className='text'>
                <h2 className='heading'>Test assignment for front-end developer</h2>
                <p className='description'>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
            </div>
            <div className=''>
                <Button name="Sign Up"/>
            </div>
        </div>
  )
}

export default Banner