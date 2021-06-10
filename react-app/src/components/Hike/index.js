import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import MainNav from '../MainUI/Navbar'
import Map from '../Map'
import './Hike.css'
import { getHike, addAllHikes } from "../../store/hike"

const containerStyle={
    position: 'relative',
    height: '300px',
    margin: '0 auto',
    float: 'right'
}
const Hike = () => {
    const hikes = useSelector(state => state.hike.hikes)
    const [hike, setHike] = useState(null)
    const [center, setCenter] = useState({})
    const {id} = useParams()

    const dispatch = useDispatch()

    
    useEffect(async () => {
        let data = await getHike(id)
        setHike(data)
        dispatch(addAllHikes())
        let tempCenter = {lat: data.latitude, lng: data.longitude}
        setCenter(tempCenter)
    }, [])

    return (
        <div className="hike page">
            <MainNav />
            {hike !== null ?
            <div className="hike_content">
                <img src={hike.photo} className="hike_photo" />
                <h1 className="hike_name">{hike.name}</h1>
                <p className="hike_description">{hike.description}</p>
                <Map center={center} containerStyle={containerStyle}/>
            </div>:
            <>
            </>
            }
        </div>
    )
}

export default Hike;