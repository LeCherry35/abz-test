import React, { useCallback, useEffect, useState } from 'react'
import Input from '../Input/Input'
import $api from '../../http'
import RadioInput from '../RadioInput/RadioInput'
import Button from '../Button/Button'
import ImageInput from '../ImageInput/ImageInput'

const RegistrationForm = () => {

    const [ name,setName ] = useState('')
    const [ email,setEmail ] = useState('')
    const [ phone,setPhone ] = useState('')
    const [ position_id, setPosition_id ] = useState(1)
    const [ image, setImage ] = useState(null)
    const [ isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    const [ positions, setPositions ] = useState([])

    useEffect(() => {
      fetchPositions()
    },[])


    const register = async () => {
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

    const getPositions =() => {
      return $api.get(`/positions`)
    }

    const getToken = () => {
      return $api.get(`/token`)
    }

    const registerUser = (Token, name, email, phone, position_id = 1, image= null) => {
      return $api.post(`/users`, {name, email, phone, position_id, image}, {headers:{Token}})
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
  return (
    <div className='registrationForm container'>
        <h2 className='heading'>Working with POST request</h2>
        <Input placeholder='Your name' value={name} onChange={e => setName(e.target.value)}/>
        <Input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
        <Input placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)}/>
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