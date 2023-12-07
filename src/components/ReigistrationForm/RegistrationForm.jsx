import React, { useCallback, useEffect, useRef, useState } from 'react'
import Input from '../Input/Input'
import $api from '../../http'
import RadioInput from '../RadioInput/RadioInput'
import Button from '../Button/Button'
import ImageInput from '../ImageInput/ImageInput'
import Loader from '../Loader/Loader'
import successImage from '../../img/success-image.svg'

const RegistrationForm = () => {


    const [ name,setName ] = useState('')
    const [ nameError,setNameError ] = useState('')
    const [ email,setEmail ] = useState('')
    const [ emailError,setEmailError ] = useState('')
    const [ phone,setPhone ] = useState('')
    const [ phoneError,setPhoneError ] = useState('')
    const [ position_id, setPosition_id ] = useState(null)
    const [ image, setImage ] = useState(null)
    const [imageError, setImageError] = useState(null)
    const [ isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    const [ positions, setPositions ] = useState([])
    const [ isRegistrationSuccessful, setIsRegistrationSuccessful ] = useState(false)

    useEffect(() => {
      fetchPositions()
    },[])

    const register = async e => {
      e.preventDefault()
      if(await validate()){
        setIsLoading(true)
        setError(null)
        const data = new FormData()
        data.append('name',name)
        data.append('email',email)
        data.append('phone',phone)
        data.append('position_id',position_id)
        data.append('photo',image)
        try {
          const tokenRes = await getToken()
          const res = await registerUser(tokenRes.data.token, data)
          if (res.data.success) {
            setIsRegistrationSuccessful(true)
          }
        } catch(e) {
          setError(
            e instanceof Error ? e.message : 'Unknown Error'
          );
        } finally {
          setIsLoading(false)
        }
      }
    }  

    const fetchPositions = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await getPositions()
        setPositions(res.data.positions)
      } catch(e) {
        setError(
          e instanceof Error ? e.message : 'Unknown Error'
        );
      } finally {
        setIsLoading(false)
      }
    }

    const getPositions =() => {
      return $api.get(`/positions`)
    }

    const getToken = () => {
      return $api.get(`/token`)
    }

    const registerUser = (Token, data) => {
      return $api.post(`/users`, data, {headers:{Token,'content-type': 'multipart/form-data'}})
    }

    //validation function

    const validate = async () => {
      let validated = true

      //validate name
      if(!name || name?.length < 2 || name?.length > 100) {
        setNameError('Name must be between 2 and 100 symbols')
        validated = false
      } else {
        setNameError(null)
      }

      //validate email
      if(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(email) === false) {
        setEmailError('Invalid email')
        validated = false
      } else {
        setEmailError(null)
      }

      //validate phone
      if(/^[\+]{0,1}380([0-9]{9})$/.test(phone) === false) {
        setPhoneError('Invalid hone Number')
        validated = false
      } else {
        setPhoneError(null)
      }

      //validate image
      if(image?.size > 5*1024*1024) {
        setImageError('Image size must be less than 5Mb')
        validated = false
      } else {
        setImageError(null)
      }

      const fileAsDataURL = window.URL.createObjectURL(image)
      const getHeightAndWidthFromDataUrl = dataURL => new Promise(resolve => {
        const img = new Image()
        img.onload = () => {
          resolve({
            height: img.height,
            width: img.width
          })
        }
        img.src = dataURL
      })

      const { width, height } = await getHeightAndWidthFromDataUrl(fileAsDataURL)
      if (width < 70 || height < 70) {
        setImageError('Image must be larger than 70x70')
        validated = false
      }

      return validated
    }
    if (isRegistrationSuccessful) {
      return (
        <div className='ssuccesful-refistration-screen container'>
          <h2 className='heading'>User successfully registered</h2>
          <img src={successImage} alt='Registration is successfull'/>
        </div>
      )
    } else {
      return (
        <form className='registration-form container'>
            <h2 className='heading'>Working with POST request</h2>
            <Input placeholder='Your name' value={name} onChange={e => setName(e.target.value)} error={nameError}/>
            <Input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} error={emailError}/>
            <Input placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} error={phoneError}/>
            <div className='registration-form__select-position-block'>
              <p className='text'>Select your position</p>
              <RadioInput options={positions} setSelected={setPosition_id}/>
            </div>
            <ImageInput onChange={e => setImage(e.target.files[0])} imageName={image?.name} error={imageError}/>
            {isLoading ? <Loader/> : <Button name='Sign up' onClick={register} disabled={!(name && email && phone && position_id && image)}/>}
        </form>
    )}  
}

export default RegistrationForm