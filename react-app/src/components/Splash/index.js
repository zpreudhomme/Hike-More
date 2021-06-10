import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/session'
import logo from '../../assets/images/hike-more.png'
import './Splash.css'

const Splash = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    const onLogout = async (e) => {
        dispatch(logout());
    };

    const searchHikes = (e) => {
        e.preventDefault();
        console.log("I'm searching for stuff", e.target[0].value)
        e.target[0].value = ""
    }

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
                        Login
                    </NavLink> 
                </div> :
                    <p className="splash_auth splash_logout" onClick={onLogout}>Logout</p>
                 }
            </nav>
            <div className="splash_content">
                <h2>Where do you want to go today?</h2>
                <form onSubmit={searchHikes} className="splash_search_form">
                    <input type="text"></input>
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default Splash