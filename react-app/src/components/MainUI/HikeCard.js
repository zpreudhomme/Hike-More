import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const HikeCard = ({hike}) => {
    const history = useHistory()
    const [favorited, setFavorited] = useState(null)
    const user = useSelector(state => state.session.user)
    const [totalFavorites, setTotalFavorites] = useState(null)
    const clickHikeCard = () => {
        history.push(`/hike/${hike.id}`)
    }

    useEffect(() => {
        if (user){
            for (let i = 0; i < user.favorite_hikes.length; i++){
                if (user.favorite_hikes[i].id === hike.id){
                    setFavorited(true)
                    setTotalFavorites(hike.total_favorites)
                    return;
                }
            }
        }   
        setFavorited(false)
        setTotalFavorites(hike.total_favorites)
    },[user])

    const addToFav = async (e) => {
        if (!user){
            history.push('/login')
        }
        let response = await fetch(`/api/hike/favorites/add/${hike.id}`, {
            method: ["PUT"]
        })
        let data = await response.json()
        console.log(data)
        setFavorited(true)
        setTotalFavorites(totalFavorites + 1)

        console.log("Adding to fav list")
    }

    const removeFromFav = async () => {
        if (!user){
            history.push('/login')
        }

        let response = await fetch(`/api/hike/favorites/delete/${hike.id}`, {
            method: ["PUT"]
        })
        let data = await response.json()
        console.log(data)
        setFavorited(false)
        setTotalFavorites(totalFavorites - 1)

        console.log("Remove from Fav")
    }

    return (
        <div className="hike_card" onClick={clickHikeCard}>
            <img src={hike.photo} className="hike_card_photo" />
            <div className="hike_card_data">
                <h2 className="hike_card_name">{hike.name}</h2>
                <h4>{hike.state.name}</h4>
                <h4>Added by {hike.owner.full_name}</h4>
                <div className="main_favorite_container">
                    {favorited ? (
                    <>
                        <i id="main_heart" className="fas fa-heart full-heart" onClick={(e) => removeFromFav(e)}></i>
                        <p className="hike_total_favs">Liked by {totalFavorites} {totalFavorites === 1 ? "person" : "people"}</p>
                    </>
                    ): (
                    <>
                        <i id="main_heart" className="far fa-heart empty-heart" onClick={(e) => addToFav(e)}></i>
                        <p className="hike_total_favs">Liked by {totalFavorites} {totalFavorites === 1 ? "person" : "people"}</p>
                    </>
                    )}
                </div>
                {/* <h3 className="hike_card_lat">Lat: {hike.latitude}</h3>
                <h3 className="hike_card_lng">Lng: {hike.longitude}</h3> */}
            </div>
        </div>
    )
}

export default HikeCard