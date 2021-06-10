import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import MainNav from '../MainUI/Navbar'
import './Hike.css'

const Hike = () => {
    const hikes = useSelector(state => state.hike.hikes)
    const [hike, setHike] = useState(null)
    const {id} = useParams()
    
    useEffect(() => {

    }, [])

    return (
        <div className="hike page">
            <MainNav />
            <div className="hike_content">
                <h1>Individual Hike Page</h1>
                <h3>{id}</h3>
            </div>
        </div>
    )
}

export default Hike;