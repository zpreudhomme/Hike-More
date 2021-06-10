import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import MainNav from '../MainUI/Navbar'
import Map from '../Map'
import './Hike.css'
import { getHike } from "../../store/hike"

const Hike = () => {
    const hikes = useSelector(state => state.hike.hikes)
    const [hike, setHike] = useState(null)
    const [center, setCenter] = useState({})
    const {id} = useParams()

    
    useEffect(async () => {
        let data = await getHike(id)
        setHike(data)
        console.log(data)
        let tempCenter = {lat: data.latitude, lng: data.longitude}
        setCenter(tempCenter)
    }, [])

    return (
        <div className="hike page">
            <MainNav />
            {hike !== null ?
            <div className="hike_content">
                <h1>{hike.name}</h1>
                <Map center={center}/>
                <h3>{hike.description}</h3>
            </div>:
            <>
            </>
            }
        </div>
    )
}

export default Hike;