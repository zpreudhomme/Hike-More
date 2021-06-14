import React,{ useState, useEffect } from 'react';
import HikeCard from '../MainUI/HikeCard'
import NavBar from '../MainUI/Navbar'
import Footer from '../Footer'
import './Favorites.css'

const Favorites = () => {
    const [favorites, setFavorites] = useState(null)

    useEffect(async () => {
        const response = await fetch('/api/hike/favorites')
        const data = await response.json();
        setFavorites(data.hikes)
    }, [])
    return (
        <div className="favorite page">
            <NavBar />
        { (favorites && favorites.length > 0) ? (
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
        <Footer />
        </div>
    )
}

export default Favorites;