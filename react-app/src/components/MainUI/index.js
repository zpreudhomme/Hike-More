import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Map from '../Map'
import { locateUser } from '../../store/location'
import { addAllHikes } from '../../store/hike'
import MainNav from './Navbar'
import HikeCard from './HikeCard'
import './MainUI.css'

const MainUI = () => {
    const dispatch = useDispatch();
    const userLocation = useSelector(state => state.location.userLocation)
    const user = useSelector(state => state.user)
    const hikes = useSelector(state => state.hike)
    const [recentHikes, setRecentHikes] = useState([])
    const [API_KEY, SET_API_KEY] = useState(null)

    useEffect(() => {
        let arr = []
        if(hikes.hikes){
            for (let i = hikes.hikes.length - 1; i > hikes.hikes.length - 13; i--){
                arr.push(hikes.hikes[i])
            }
        }
        console.log(arr)
        setRecentHikes(arr)
    }, [hikes])

    const getLocation = () => {
        if (navigator.geolocation){
            return navigator.geolocation.getCurrentPosition(setUserLocation)
        }
        else {
            return "Geolocation not supported on your browser :("
        }
    }

    const setUserLocation = (location) => {
        dispatch(locateUser(location.coords.latitude, location.coords.longitude))
    }

    useEffect(() => {
        dispatch(addAllHikes())     
        getLocation()
    }, [])

    useEffect(() => {
        (async () => {
          const response = await fetch('/api/map/');
          const data = await response.json()
          SET_API_KEY(data.api_key);
        })()
      }, [])


    return API_KEY && (
        <div className="main page">
            <MainNav />
            <div className="main_content">
                <h2>Find Your Hike</h2>
            <div className="main_map" id="main_map">
                <Map API_KEY={API_KEY}/>
            </div>
            <div><NavLink to="/new-hike" className="main_create_btn">Create Your Own Hike</NavLink></div>
            <h2>Recent Hikes Added</h2>
            <div className="main_recent">
            { recentHikes.map((hike, i) => (
                <HikeCard hike={hike} key={i} />
            ))}
            </div>
            </div>
        </div>
        )
}

export default MainUI