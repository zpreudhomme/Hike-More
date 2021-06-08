import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

require('dotenv').config()

const API_KEY = process.env.REACT_APP_GOOGLE_API

const mapStyles = {
  width: '50%',
  height: '50%',
  display: 'inline-block'
};

const containerStyle = {
  position: 'relative',
  width: '1000px',
  height: '750px',
  top: '25px',
  margin: '0 auto'
}


const MapContainer = (props) => {
    const userLocation = useSelector(state => state.location.userLocation)
    const hikes = useSelector(state => state.hike)

    const [selectedHike, setSelectedHike] = useState();

    const markerClick = (hike) => {
      setSelectedHike(hike)
      console.log("I have set selected hike to:   ", hike)
    }

    // useEffect(() => {
    //   console.log(selectedHike)
    // }, [hikes, selectedHike])


    let center = { lat: 35.3462, lng: -111.6791 }
    if (userLocation){
      center = {lat: userLocation.latitude, lng: userLocation.longitude}
    }
    if (props.center){
      center = props.center
    }

    let markers = (hikes.hikes.map((place, i)=> (
      <Marker 
        key={i}
        position={{lat: place.latitude, lng: place.longitude}}
        onClick={() => markerClick(place)}
      />
    )));

    // let markerWindows = 

    return (
      <div className="map_wrapper">
      {hikes !== null && 
        <Map
          google={props.google}
          zoom={8}
          containerStyle={containerStyle}
          initialCenter={center}
        >
          { markers }
          {selectedHike &&
            <InfoWindow 
            position ={{
              lat: selectedHike.latitude,
              lng: selectedHike.longitude
            }}
            visible={true}
            >
              <div>
                <h1>{selectedHike.name}</h1>
                <p>{selectedHike.description}</p>
              </div>
            </InfoWindow>
          }
        </Map>
      }
      </div>
    );
  
}
export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);