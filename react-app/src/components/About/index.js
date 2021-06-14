import React from 'react'
import MainNav from '../MainUI/Navbar'
import linkedin_zane from '../../assets/images/linkedin_zane.jpg'
import './About.css'

const About = () => {
    return (
        <div className="about page">
            <MainNav />
            <div className="about_content">
                <h1 className="about_title"> About</h1>
                <div className="about_project">
                    <h2>Project Goals</h2>
                    <p className="about_goals">
                    Hike More is loosely inspired by the website <a href="https://www.alltrails.com/">AllTrails</a> with an emphasis on 
                    users being able to create and search for hikes within the database 
                    </p>
                    <h2>Technologies Used</h2>
                    <ul classname="about_tech">
                        <li className="about_li">React/Redux</li>
                        <li className="about_li">Python</li>
                        <li className="about_li">GoogleMaps API</li>
                        <li className="about_li">Flask</li>
                        <li className="about_li">PostgreSQL</li>
                    </ul>
                </div>
                <div className="about_creator">
                    <img src={linkedin_zane} className="about_profile_img"/>
                    <h2>Zane Preudhomme</h2>
                    <p className="about_profile_description">
                        <a href="https://github.com/zpreudhomme">GitHub</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About