import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import MainNav from '../MainUI/Navbar'
import Map from '../Map'
import './Hike.css'
import { getHike, addAllHikes } from "../../store/hike"

const containerStyle={
    position:'relative',
    width: '400px',
    height: '300px',
    margin: '0 auto',
    // 'grid-area': 'map',
}
const Hike = () => {
    const hikes = useSelector(state => state.hike.hikes)
    const user = useSelector(state=> state.session.user)
    const [hike, setHike] = useState(null)
    const [center, setCenter] = useState({})
    const {id} = useParams()

    const dispatch = useDispatch()

    const addToFav = () => {
        console.log("Adding to fav list")
    }

    const deleteHike = () => {
        console.log("Deleting Hike")
    }

    const editHike = () => {
        console.log("Editing Hike")
    }
    
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
                <div className="add_to_fav"><button type="button" onClick={addToFav}>I Want to Go!</button></div>
                {user && user.id === hike.owner.id && (
                    <div className="hike_owner_buttons">
                        <div className="edit_hike"><button type="button" onClick={editHike}>Edit My Hike</button></div>
                        <div className="delete_hike"><button type="button" onClick={deleteHike}>Delete My Hike</button></div>
                    </div>
                )}
            </div>:
            <>
            </>
            }
        </div>
    )
}

export default Hike;