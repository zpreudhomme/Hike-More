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
            <div className="hike_card_data">
                <h1 className="hike_card_name">{hike.name}</h1>
                <h3>Favorites: {hike.user_favorites.length}</h3>
                <h3 className="hike_card_lat">Lat: {hike.latitude}</h3>
                <h3 className="hike_card_lng">Lng: {hike.longitude}</h3>
            </div>
        </div>
    )
}

export default HikeCard