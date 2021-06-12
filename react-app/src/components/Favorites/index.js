import React,{ useState, useEffect } from 'react';
import HikeCard from '../MainUI/HikeCard'


const Favorites = () => {
    const [favorites, setFavorites] = useState(null)

    useEffect(async () => {
        const response = await fetch('/api/hike/favorites')
        const data = await response.json();
        console.log(data)
        setFavorites(data.hikes)
    }, [])
    return (
        <div className="favorite page">
        { favorites ? (
            <div className="favorite_content">
                <h1>Favorite Hikes</h1>
                <div className="favorites_container">
                    {favorites.map((hike, i) => (
                        <HikeCard hike={hike} key={i} />
                ))}
                </div>
            </div>
        ): (
            <div className="favorite_content">
                <h1>You have no favorites</h1>
            </div>
        )}
        </div>
    )
}

export default Favorites;