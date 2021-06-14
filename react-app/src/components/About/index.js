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

                    </p>
                    <h2>Technologies Used</h2>
                    <p classname="about_tech">

                    </p>
                </div>
                <div className="about_creator">
                    <img src={linkedin_zane} className="about_profile_img"/>
                    <h2>Zane Preudhomme</h2>
                    <p className="about_profile_description">

                    </p>
                </div>
            </div>
        </div>
    )
}

export default About