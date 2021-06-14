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
            console.log(data)
            setSearchReturns(data.values)
        }
        if (searchParams.length > 0) fetchHikes()
        else setSearchReturns({})
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
                       {/* {searchReturns && (
                           <div className="main_search_return">
                               {searchReturns.map((el, i) => (
                                   <div className="search_result">
                                       {el.total_favorites && (
                                           <>
                                            <p className="search_hike_name">{el.name}</p>
                                            <p className="search_hike_creator">{el.owner.full_name}</p>
                                            <p className="search_hike_state">{el.state.name}</p>
                                           </>
                                       )}
                                   </div>
                               ))}
                           </div>
                       )} */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Splash