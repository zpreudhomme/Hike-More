import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/session'
import logo from '../../assets/images/hike-more.png'

const MainNav = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const onLogout = async (e) => {
        dispatch(logout());
    };

    return (
        <nav className="main_nav">
                <a href="/"><img src={logo} className="main_logo"/></a>
                <h1 id="main_nav_text">Hike More</h1>
                {user ?
                <button onClick={onLogout}>Logout</button>:
                <div className = "main_auth_buttons">
                    <NavLink to="/sign-up" className="splash_auth splash_signup">
                        Sign Up
                    </NavLink>
                    <NavLink to="login" className="splash_auth splash_login">
                        Login
                    </NavLink>  
                </div>}
            </nav>
    )
}

export default MainNav