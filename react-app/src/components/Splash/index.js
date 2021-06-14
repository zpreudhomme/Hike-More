import React, {useEffect, useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/session'
import logo from '../../assets/images/hike-more.png'
import './Splash.css'

const Splash = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useState("")
    const [searchReturns, setSearchReturns] = useState([])
    const history = useHistory()

    const onLogout = async (e) => {
        dispatch(logout());
    };

    const onSearchClick = (e) => {
        history.push(`/hike/${e.target.id}`)
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
            setSearchReturns(data.hikes)
        }
        if (searchParams.length > 0) fetchHikes()
        else setSearchReturns([])
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
                        placeholder="Search by hike"
                        value={searchParams}
                        onChange={(e) => setSearchParams(e.target.value)}></input>
                    </form>
                    <div className="search_result_container">
                       {searchReturns.map((el, i) => (
                           <div id={el.id} className="search_result" onClick={(e) => onSearchClick(e)}>                              
                                   <h3>{el.name}</h3> 
                           </div>
                       ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Splash