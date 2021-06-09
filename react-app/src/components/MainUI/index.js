import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Map from '../Map'
import { locateUser } from '../../store/location'
import { addAllHikes } from '../../store/hike'
import MainNav from './Navbar'
import './MainUI.css'

const MainUI = () => {
    const dispatch = useDispatch();
    const userLocation = useSelector(state => state.location.userLocation)
    const user = useSelector(state => state.user)
    const hikes = useSelector(state => state.hike)

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


    return (
        <div className="main page">
            <MainNav />
            <div className="main_content">
                <h2>Find Your Hike</h2>
            <div className="main_map" id="main_map">
                <Map />
            </div>
            {userLocation !== null ? 
            <>
                <h1>User Location</h1>
                <h2>Latitude: {userLocation.latitude}</h2>
                <h2>Logitude: {userLocation.longitude}</h2>
            </>:
            <h2>Location Failed</h2>}
                <h3>Can you see this?</h3>
            </div>
        </div>
        )
}

export default MainUI