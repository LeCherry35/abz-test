import React from 'react'
import loaderImage from '../../img/preloader.svg'


const Loader = () => {
  return (
    <div className='loaderContainer'><img className='rotate' src={loaderImage} alt='Loading...'/></div>
  )
}

export default Loader