import React from 'react';
import { useSelector } from 'react-redux'
import { Map, GoogleApiWrapper } from 'google-maps-react';

require('dotenv').config()

const API_KEY = process.env.REACT_APP_GOOGLE_API

const mapStyles = {
  width: '50%',
  height: '50%'
};


const MapContainer = (props) => {
    const userLocation = useSelector(state => state.location.userLocation)
    let center = { lat: 35.3462, lng: -111.6791 }
    if (userLocation){
      center = {lat: userLocation.latitude, lng: userLocation.longitude}
    }
    if (props.center){
      center = props.center
    }

    return (
      <Map
        google={props.google}
        zoom={12}
        // style={mapStyles}
        initialCenter={center}
      />
    );
  
}
console.log(API_KEY)
export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);