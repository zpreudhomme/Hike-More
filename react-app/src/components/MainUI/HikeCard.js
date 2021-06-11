import React from 'react'
import { useHistory } from 'react-router'

const HikeCard = ({hike}) => {
    const history = useHistory()
    const clickHikeCard = () => {
        history.push(`/hike/${hike.id}`)
    }

    return (
        <div className="hike_card" onClick={clickHikeCard}>
            <img src={hike.photo} className="hike_card_photo" />
            <h1 className="hike_card_name">{hike.name}</h1>
            <h3 className="hike_card_lat">Latitude: {hike.latitude}</h3>
            <h3 className="hike_card_lng">Longitude: {hike.longitude}</h3>
        </div>
    )
}

export default HikeCard