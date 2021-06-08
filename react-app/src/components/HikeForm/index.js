import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';

const HikeForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [description, setDescription] = useState("")
    const [state, setState] = useState(0)
    const [stateChoices, setStateChoices] = useState([])
    const dispatch = useDispatch()

    // useEffect(() => {
    //     stateChoices = 
    // }, [])

    const onSubmit = () => {
        return null;
    }

    const updateName = (e) => {
        setName(e.target.value)
    }

    const updateLatitude = (e) => {
        setLatitude(e.target.value)
    }

    const updateLongitude = (e) => {
        setLongitude(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    return (
        <div className="hike page">
        <div className="hike_form_wrapper">
          <form onSubmit={onSubmit} className="hike_form">
          <h2>New Hike</h2>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <label>Hike Name</label>
            <input
              type="text"
              name="username"
              onChange={updateName}
              value={name}
              required={true}
            ></input>
            <label>Latitude</label>
            <input
              type="text"
              name="first_name"
              onChange={updateLatitude}
              value={latitude}
              required={true}
            ></input>
            <label>Longitude</label>
            <input
              type="text"
              name="first_name"
              onChange={updateLongitude}
              value={longitude}
              required={true}
            ></input>
            <label>Description</label>
            <input
              type="text"
              name="last_name"
              onChange={updateDescription}
              value={description}
              required={true}
            ></input>
            {/* <label>State</label>
            <select name="state">

            </select> */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
}

export default HikeForm