import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { useHistory } from 'react-router';

require('dotenv').config()

const mapStyles = {
  width: '50%',
  height: '50%',
  display: 'inline-block'
};


const MapContainer = (props) => {
  const userLocation = useSelector(state => state.location.userLocation)
  const user = useSelector(state => state.session.user)
  const hikes = useSelector(state => state.hike)
  
  const [selectedHike, setSelectedHike] = useState(null);
  
  const markerClick = (hike) => {
    setSelectedHike(hike)
    console.log("I have set selected hike to:   ", hike)
  }


  let containerStyle;
  if (!props.containerStyle){
      containerStyle = {
      position: 'relative',
      width: '1000px',
      height: '600px',
      margin: '0 auto'
    }
  } else{
    containerStyle = props.containerStyle
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
  let markers;
    if (hikes.hikes !== null){
      markers = (hikes.hikes.map((place, i)=> (
        <Marker 
          key={i}
          position={{lat: place.latitude, lng: place.longitude}}
          onClick={() => markerClick(place)}
        />
      )));
    }

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
              <div className="map_infobox">
                <a href={`/hike/${selectedHike.id}`}>
                  <h1>{selectedHike.name}</h1>
                </a>
                <img src={selectedHike.photo} className="map_photo"/>
                <h3>Located in {selectedHike.state.name}</h3>
                <h3>Created by {selectedHike.owner.full_name}</h3>
                <h3>Liked by {selectedHike.total_favorites} {selectedHike.total_favorites === 1 ? "person" : "people"}</h3>
              </div>
            </InfoWindow>
          }
        </Map>
      }
      </div>
    );
  
}
export default GoogleApiWrapper(
  (props) => ({
  apiKey: props.API_KEY
}))(MapContainer);