import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Map from '../Map'
import { locateUser } from '../../store/location'

const MainUI = () => {
    const dispatch = useDispatch();
    const userLocation = useSelector(state => state.location.userLocation)

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
        getLocation()     
    }, [])


    return (
        <div className="main page">
            <h1>Main UI</h1>
            {userLocation !== null ? 
            <>
                <h1>User Location</h1>
                <h2>Latitude: {userLocation.latitude}</h2>
                <h2>Logitude: {userLocation.longitude}</h2>
            </>:
            <h2>Location Failed</h2>}
            <div className="main_map" id="main_map">
                <Map />
            </div>
        </div>
        )
}

export default MainUI