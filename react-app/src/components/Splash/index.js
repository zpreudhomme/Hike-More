import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/session'
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
                <h3>Logo Here</h3>
                {user === null ? 
                <div className="splash_auth_buttons">
                    <NavLink to="/sign-up" className="splash_auth splash_signup">
                        Sign Up
                    </NavLink>
                    <NavLink to="login" className="splash_auth splash_login">
                        Login
                    </NavLink> 
                </div> :
                    <button onClick={onLogout}>Logout</button>
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