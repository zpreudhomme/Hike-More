import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { locateUser } from '../../store/location'

const MainUI = () => {
    const dispatch = useDispatch();
    const [center, setCenter] = useState({ lat: 35.3462, lng: -111.6791 })
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

    // const initMap = () => {
    //     let location;
    //     if ( userLocation !== null){
    //         location = { lat: userLocation["latitude"], lng: userLocation["longitude"] }
    //     } else {
    //         location = { lat: 35.3462, lng: -111.6791}
    //     }
    //     const map = new google.maps.Map(document.getElementById("main_map"), {
    //         zoom: 13,
    //         center: location
    //     })
    // }

    useEffect(() => {
        getLocation() 
        console.log(userLocation)    
    }, [])

    return (
        <div className="main page">
            <h1>Main UI</h1>
            {userLocation !== null ? 
            <>
                <h2>{userLocation.latitude}</h2>
                <h2>{userLocation.longitude}</h2>
            </>:
            <h2>Location Failed</h2>}
            <div className="main_map" id="main_map">
                {/* <Map
                    google={this.props.google}
                    zoom={13}
                    style={mapStyles}
                    initialCenter={center}
                /> */}
            </div>
        </div>
        )
}

export default GoogleApiWrapper({
    apiKey:'AIzaSyAxVlOZIzWwqp2w15ABN_8GH4ggr5i6xU0'
    })(MainUI);