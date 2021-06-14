import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/session'
import logo from '../../assets/images/hike-more.png'
import './Splash.css'

const Splash = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useState("")
    const [searchReturns, setSearchReturns] = useState({})

    const onLogout = async (e) => {
        dispatch(logout());
    };

    const searchHikes = (e) => {
        e.preventDefault();
        console.log("I'm searching for stuff", e.target[0].value)
        setSearchParams("")
    }

    useEffect(() => {
        const fetchHikes = async () => {
            const response = await fetch('api/search/', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({searchParams})
            })

            const data = await response.json();

            setSearchReturns(data)
        }
        if (searchParams.length > 0) fetchHikes()
        else setSearchReturns({})
        console.log(searchReturns)
    }, [searchParams])

    return (
        <div className="splash page">
            <nav className="splash_nav">
                <a href="/home"><img src={logo} className="splash_logo"/></a>
                {user === null ? 
                <div className="splash_auth_buttons">
                    <NavLink to="/sign-up" className="splash_auth splash_signup">
                        Sign Up
                    </NavLink>
                    <NavLink to="login" className="splash_auth splash_login">
                        Log in
                    </NavLink> 
                </div> :
                    <p className="splash_auth splash_logout" onClick={onLogout}>Logout</p>
                 }
            </nav>
            <div className="splash_content">
                <div className="splash_center">
                    <h2>Where do <span className="splash_emphasis">you</span> want to go?</h2>
                    <form  className="splash_search_form">
                        <input 
                        type="text"
                        placeholder="Search by hike, state, or creator..."
                        value={searchParams}
                        onChange={(e) => setSearchParams(e.target.value)}></input>
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Splash