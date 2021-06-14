import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import MainNav from '../MainUI/Navbar'
import Map from '../Map'
import Footer from '../Footer'
import './Hike.css'
import { getHike, addAllHikes, deleteHike, editHike } from "../../store/hike"

const containerStyle={
    position:'relative',
    width: '500px',
    height: '350px',
    margin: '0 auto',
    // 'grid-area': 'map',
}
const Hike = () => {
    const user = useSelector(state=> state.session.user)
    const [hike, setHike] = useState(null)
    const [favorited, setFavorited] = useState(null)
    const [totalFavorites, setTotalFavorites] = useState(null)
    const [center, setCenter] = useState({})
    const [API_KEY, SET_API_KEY] = useState(null)
    const {id} = useParams()

    const history = useHistory()
    const dispatch = useDispatch()

    const addToFav = async () => {
        if (!user){
            history.push('/login')
        }
        let response = await fetch(`/api/hike/favorites/add/${id}`, {
            method: ["PUT"]
        })
        let data = await response.json()
        setFavorited(true)
        setTotalFavorites(totalFavorites + 1)
    }

    const removeFromFav = async () => {
        if (!user){
            history.push('/login')
        }

        let response = await fetch(`/api/hike/favorites/delete/${id}`, {
            method: ["PUT"]
        })
        let data = await response.json()
        setFavorited(false)
        setTotalFavorites(totalFavorites - 1)

    }

    const handleDeleteHike = async() => {
        let data = dispatch(deleteHike(id))
        history.push('/home')
    }

    const editHike = () => {
        history.push(`/edit-hike/${id}`)
    }

    useEffect(() => {
        if (user){
            for (let i = 0; i < user.favorite_hikes.length; i++){
                if (user.favorite_hikes[i].id === Number(id)){
                    setFavorited(true)
                    return;
                }
            }
        }   
        setFavorited(false)
    },[id, user])

    useEffect(() => {
        (async () => {
          const response = await fetch('/api/map/');
          const data = await response.json()
          SET_API_KEY(data.api_key);
        })()
      }, [])
    
    useEffect(async () => {
        let data = await getHike(id)
        setHike(data)
        dispatch(addAllHikes())
        let tempCenter = {lat: data.latitude, lng: data.longitude}
        setCenter(tempCenter)
        setTotalFavorites(data.user_favorites.length)
    }, [])

    return API_KEY && (
        <div className="hike page">
            <MainNav />
            {hike !== null ?
            <div className="hike_content">
                <img src={hike.photo} className="hike_photo" />
                <h1 className="hike_name">{hike.name}</h1>
                <div className="hike_favorite_container">
                    {favorited ? (
                    <>
                        <i className="fas fa-heart full-heart" onClick={removeFromFav}></i>
                        <p className="hike_total_favs">Liked by {totalFavorites} {totalFavorites === 1 ? "person" : "people"}</p>
                    </>
                    ): (
                    <>
                        <i className="far fa-heart empty-heart" onClick={addToFav}></i>
                        <p className="hike_total_favs">Liked by {totalFavorites} {totalFavorites === 1 ? "person" : "people"}</p>
                    </>
                    )}
                </div>
                <p className="hike_description">{hike.description}</p>
                <Map center={center} containerStyle={containerStyle} API_KEY={API_KEY}/>
                {user && user.id === hike.owner.id && (
                    <div className="hike_owner_buttons">
                        <button type="button" className="edit_hike" onClick={editHike}>Edit My Hike</button>
                        <button type="button" className="delete_hike" onClick={handleDeleteHike}>Delete My Hike</button>
                    </div>
                )}
            </div>:
            <>
            <h1>Hike not found</h1>
            </>
            }
            <Footer />
        </div>
    )
}

export default Hike;