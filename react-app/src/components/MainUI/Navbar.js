import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/session'
import logo from '../../assets/images/hike-more.png'
import logo_text from '../../assets/images/hike-more-text.png'

const MainNav = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const onLogout = async (e) => {
        dispatch(logout());
    };

    return (
        <nav className="main_nav">
            <div className="main_nav_logo_container">
                <a href="/"><img src={logo} className="main_logo"/></a>
                <a href="/home"><img src={logo_text} /></a>
            </div>
                {user ?
                <div className="nav_authorized_buttons">
                    <NavLink to="/favorites" className="splash_auth">
                        Favorites
                    </NavLink>
                    <p className="splash_auth" onClick={onLogout}>Logout</p>
                </div>
                :
                <div className = "main_auth_buttons">
                    <NavLink to="/sign-up" className="splash_auth splash_signup">
                        Sign Up
                    </NavLink>
                    <NavLink to="/login" className="splash_auth splash_login">
                        Log in
                    </NavLink>  
                </div>}
            </nav>
    )
}

export default MainNav