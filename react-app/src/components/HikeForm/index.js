import React, {useState} from 'react'
import { useDispatch } from 'react-redux';

const HikeForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [description, setDesription] = useState("")
    const [state, setState] = useState(0)
    const dispatch = useDispatch()

    const onSubmit = () => {
        return null;
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
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
            <label>Latitude</label>
            <input
              type="text"
              name="first_name"
              onChange={updateFirstName}
              value={firstName}
              required={true}
            ></input>
            <label>Description</label>
            <input
              type="text"
              name="last_name"
              onChange={updateLastName}
              value={lastName}
              required={true}
            ></input>
            <label>State</label>
            <input
              type="text"
              name="profile_photo"
              onChange={updateProfilePhoto}
              value={profilePhoto}
            ></input>
            <button type="submit">Submitlk</button>
          </form>
        </div>
      </div>
    )
}