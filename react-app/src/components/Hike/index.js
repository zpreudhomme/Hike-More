import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import MainNav from '../MainUI/Navbar'
import Map from '../Map'
import './Hike.css'
import { getHike, addAllHikes, deleteHike, editHike } from "../../store/hike"

const containerStyle={
    position:'relative',
    width: '400px',
    height: '300px',
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
        console.log(data)
        setFavorited(true)
        setTotalFavorites(totalFavorites + 1)

        console.log("Adding to fav list")
    }

    const removeFromFav = async () => {
        if (!user){
            history.push('/login')
        }

        let response = await fetch(`/api/hike/favorites/delete/${id}`, {
            method: ["PUT"]
        })
        let data = await response.json()
        console.log(data)
        setFavorited(false)
        setTotalFavorites(totalFavorites - 1)

        console.log("Remove from Fav")
    }

    const handleDeleteHike = async() => {
        let data = dispatch(deleteHike(id))
        console.log(data)
        history.push('/home')
    }

    const editHike = () => {
        history.push(`/edit-hike/${id}`)
    }

    useEffect(() => {
        if (user){
            for (let i = 0; i < user.favorite_hikes.length; i++){
                console.log(user.favorite_hikes[i].id, id)
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
                <h3 className="hike_total_favs">Favorites: {totalFavorites}</h3>
                <p className="hike_description">{hike.description}</p>
                <Map center={center} containerStyle={containerStyle} API_KEY={API_KEY}/>
                <div className="hike_favorite_container">
                    {favorited ? (
                        <div className={"remove_from_favorites"} onClick={removeFromFav}>Remove</div>
                    ): (
                        <div className={"add_to_favorites"} onClick={addToFav}>Add</div> 
                    )}
                </div>
                {user && user.id === hike.owner.id && (
                    <div className="hike_owner_buttons">
                        <div className="edit_hike"><button type="button" onClick={editHike}>Edit My Hike</button></div>
                        <div className="delete_hike"><button type="button" onClick={handleDeleteHike}>Delete My Hike</button></div>
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