import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Map from '../Map'
import { locateUser } from '../../store/location'
import { addAllHikes } from '../../store/hike'
import MainNav from './Navbar'
import HikeCard from './HikeCard'
import Footer from "../Footer"
import './MainUI.css'

const MainUI = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const hikes = useSelector(state => state.hike)
    const [recentHikes, setRecentHikes] = useState([])
    const [popularHikes, setPopularHikes] = useState([])
    const [API_KEY, SET_API_KEY] = useState(null)

    useEffect(() => {
        let arr = []
        if(hikes.hikes){
            for (let i = hikes.hikes.length - 1; i > hikes.hikes.length - 7; i--){
                arr.push(hikes.hikes[i])
            }
        }
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

    useEffect(async () => {
        const response = await fetch("/api/hike/popular")
        const data = await response.json()
        setPopularHikes(data.popular)
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
                <h2 className="main_content_name">Find Your Hike</h2>
                <div className="main_map" id="main_map">
                    <Map API_KEY={API_KEY}/>
                </div>
                <div><NavLink to="/new-hike" className="main_create_btn">Create Your Own Hike</NavLink></div>
                <div className="main_grid_wrapper">
                <div className="main_recent_wrapper">
                    <h2>Recent Hikes Added</h2>
                    <div className="main_recent">
                        { recentHikes.map((hike, i) => (
                            <HikeCard hike={hike} key={hike.id} />
                        ))}
                    </div>
                </div>
                <div className="main_popular_wrapper">
                    <h2>Popular Hikes</h2>
                    <div className="main_popular">
                            {popularHikes.map((hike, i) => (
                                <HikeCard hike={hike} key={i} />
                            ))}
                    </div>
                </div>
                </div>
            </div>
            <Footer />
        </div>
        )
}

export default MainUI