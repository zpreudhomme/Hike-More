import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/session'

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
        <div className="splash_page">
            <nav className="splash_nav">
                <div>Logo Here</div>
                {user === null ? 
                <>
                    <NavLink to="/sign-up">Sign Up</NavLink>
                    <NavLink to="login">Login</NavLink> 
                </> :
                    <button onClick={onLogout}>Logout</button>
                 }
            </nav>
            <div className="splash_content">
                <h2>Where do you want to go today?</h2>
                <form onSubmit={searchHikes}>
                    <input type="text"></input>
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default Splash