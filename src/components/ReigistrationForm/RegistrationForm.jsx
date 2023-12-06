import React, { useCallback, useEffect, useState } from 'react'
import Input from '../Input/Input'
import $api from '../../http'
import RadioInput from '../RadioInput/RadioInput'
import Button from '../Button/Button'
import ImageInput from '../ImageInput/ImageInput'

const RegistrationForm = () => {

    const [ name,setName ] = useState('')
    const [ nameError,setNameError ] = useState('')
    const [ email,setEmail ] = useState('')
    const [ emailError,setEmailError ] = useState('')
    const [ phone,setPhone ] = useState('')
    const [ phoneError,setPhoneError ] = useState('')
    const [ position_id, setPosition_id ] = useState(1)
    const [ image, setImage ] = useState(null)
    const [ isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    const [ positions, setPositions ] = useState([])

    useEffect(() => {
      fetchPositions()
    },[])


    const register = async () => {
      if(validate()){
        setIsLoading(true)
        setError(null)
        try {
          const tokenRes = await getToken()
          const res = await registerUser(tokenRes.data.token, name, email, phone, position_id, image)
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

    const registerUser = (Token, name, email, phone, position_id = 1, image= null) => {
      return $api.post(`/users`, {name, email, phone, position_id, image}, {headers:{Token}})
    }

    const validate = (name) => {
      let validated = true
      if(!name || name?.length < 2 || name?.length > 100) {
        setNameError('Name must be between 2 and 100 symbols')
        validated = false
      }

      if(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(email) === false) {
        setEmailError('Invalid email')
        validated = false
      }

      if(/^[\+]{0,1}380([0-9]{9})$/.test(phone) === false) {
        setPhoneError('Invalid hone Number')
        validated = false
      } 
      return validated
    }
  return (
    <div className='registrationForm container'>
        <h2 className='heading'>Working with POST request</h2>
        <Input placeholder='Your name' value={name} onChange={e => setName(e.target.value)} error={nameError}/>
        <Input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} error={emailError}/>
        <Input placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} error={phoneError}/>
        <div className='selectPositionBlock'>
          <p className='text'>Select your position</p>
          <RadioInput options={positions}/>
        </div>
        <ImageInput onChange={e => setImage(e.target.files[0])} imageName={image?.name}/>
        <Button name='Sign up' onClick={register} />
    </div>
  )
}

export default RegistrationForm