import React, { useCallback, useEffect, useState } from 'react'
import $api from '../../http'
import Card from '../Card/Card'
import Button from '../Button/Button'
import Loader from '../Loader/Loader'

const ProfilesList = () => {
    const count = 6
    const [ pageNumber, setPageNumber ] = useState(1)
    const [ profiles, setProfiles ] = useState([])
    const [nextPageLink, setNextPageLink] = useState(null)
    const [ isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);


    useEffect(()=> {
      const fetchData = async () => {
        setIsLoading(true)
        setError(null)
        try {
          const res = await getProfiles(pageNumber, count)
          setProfiles([...profiles, ...res.data.users])
          setNextPageLink(res.data.links.next_url)
        } catch(e) {
          setPageNumber(page => --page)
          setError(
            e instanceof Error ? e.message : 'Unknown Error: api.get.data'
          );
        } finally {
          setIsLoading(false)
        }

      }
      fetchData()
    },[pageNumber])



    const getProfiles =  useCallback((pageNumber, count) => {
        return $api.get(`/users?page=${pageNumber}&count=${count}`)
    },[])

  return (
    <div className='list container'>
    
        <h2 className='heading'>Working with GET request</h2>
        <div className='profilesContainer'>
        {profiles.map(profile => <Card {...profile} />)}
        </div>
        {isLoading 
        ? <Loader/>
        : nextPageLink && <div className='buttonContainer'><Button name='Show more' onClick={() => setPageNumber(page => ++page)}/></div>}
    </div>
  )
}

export default ProfilesList