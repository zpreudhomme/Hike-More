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
                <h2 className="hike_card_name">{hike.name}</h2>
                <h4>{hike.state.name}</h4>
                <h4>Added by {hike.owner.full_name}</h4>
                <h4>Favorited By {hike.total_favorites}</h4>
                {/* <h3 className="hike_card_lat">Lat: {hike.latitude}</h3>
                <h3 className="hike_card_lng">Lng: {hike.longitude}</h3> */}
            </div>
        </div>
    )
}

export default HikeCard