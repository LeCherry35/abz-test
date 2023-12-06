import React, { useCallback, useEffect, useState } from 'react'
import $api from '../../http'
import Card from '../Card/Card'
import Button from '../Button/Button'
import Loader from '../Loader/Loader'

const ProfilesList = () => {
    const count = 6
    const [ offset, setOffset ] = useState(0)
    const [ profiles, setProfiles ] = useState([])
    const [ positions, setPositions ] = useState([])
    const [nextPageLink, setNextPageLink] = useState(null)
    const [ isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);


    useEffect(()=> {
      fetchProfiles(offset, count)
    },[])

    const getProfiles =  useCallback((offset, count) => {
        return $api.get(`/users?offset=${offset}&count=${count}`)
    },[])

    

    const fetchProfiles = async (offset,count) => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await getProfiles(offset, count)
        setProfiles([...profiles, ...res.data.users])
        setNextPageLink(res.data.links.next_url)
      } catch(e) {
        setError(
          e instanceof Error ? e.message : 'Unknown Error'
        );
      } finally {
        setIsLoading(false)
      }

    }
    

  return (
    <div className='profiles-container container'>
    
        <h2 className='heading'>Working with GET request</h2>
        <div className='profiles-container__profiles-list'>
        {profiles.map((profile, id) => <Card {...profile} key={'profile_' + id}/>)}
        </div>
        {isLoading 
        ? <Loader/>
        : nextPageLink && <Button name='Show more' onClick={() => fetchProfiles(profiles.length,count) }/>}
    </div>
  )
}

export default ProfilesList