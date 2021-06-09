import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import MainNav from '../MainUI/Navbar'

const Hike = () => {
    const hikes = useSelector(state => state.hike.hikes)
    const [hike, setHike] = useState(null)
    
    useEffect(() => {

    }, [])

    return (
        <div className="hike page">
            <MainNav />
            <h1>Individual Hike Page</h1>
        </div>
    )
}

export default Hike;