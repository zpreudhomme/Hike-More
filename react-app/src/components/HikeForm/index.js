import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import MainNav from '../MainUI/Navbar'
import './HikeForm.css'
import { createHike } from '../../store/hike'
import { useHistory } from 'react-router';

const states= [
  {
      "name": "Alabama",
      "abbr": "AL"
  },
  {
      "name": "Alaska",
      "abbr": "AK"
  },
  {
      "name": "Arizona",
      "abbr": "AZ"
  },
  {
      "name": "Arkansas",
      "abbr": "AR"
  },
  {
      "name": "California",
      "abbr": "CA"
  },
  {
      "name": "Colorado",
      "abbr": "CO"
  },
  {
      "name": "Connecticut",
      "abbr": "CT"
  },
  {
      "name": "Delaware",
      "abbr": "DE"
  },
  {
      "name": "Florida",
      "abbr": "FL"
  },
  {
      "name": "Georgia",
      "abbr": "GA"
  },
  {
      "name": "Hawaii",
      "abbr": "HI"
  },
  {
      "name": "Idaho",
      "abbr": "ID"
  },
  {
      "name": "Illinois",
      "abbr": "IL"
  },
  {
      "name": "Indiana",
      "abbr": "IN"
  },
  {
      "name": "Iowa",
      "abbr": "IA"
  },
  {
      "name": "Kansas",
      "abbr": "KS"
  },
  {
      "name": "Kentucky",
      "abbr": "KY"
  },
  {
      "name": "Louisiana",
      "abbr": "LA"
  },
  {
      "name": "Maine",
      "abbr": "ME"
  },
  {
      "name": "Maryland",
      "abbr": "MD"
  },
  {
      "name": "Massachusetts",
      "abbr": "MA"
  },
  {
      "name": "Michigan",
      "abbr": "MI"
  },
  {
      "name": "Minnesota",
      "abbr": "MN"
  },
  {
      "name": "Mississippi",
      "abbr": "MS"
  },
  {
      "name": "Missouri",
      "abbr": "MO"
  },
  {
      "name": "Montana",
      "abbr": "MT"
  },
  {
      "name": "Nebraska",
      "abbr": "NE"
  },
  {
      "name": "Nevada",
      "abbr": "NV"
  },
  {
      "name": "New Hampshire",
      "abbr": "NH"
  },
  {
      "name": "New Jersey",
      "abbr": "NJ"
  },
  {
      "name": "New Mexico",
      "abbr": "NM"
  },
  {
      "name": "New York",
      "abbr": "NY"
  },
  {
      "name": "North Carolina",
      "abbr": "NC"
  },
  {
      "name": "North Dakota",
      "abbr": "ND"
  },
  {
      "name": "Ohio",
      "abbr": "OH"
  },
  {
      "name": "Oklahoma",
      "abbr": "OK"
  },
  {
      "name": "Oregon",
      "abbr": "OR"
  },
  {
      "name": "Pennsylvania",
      "abbr": "PA"
  },
  {
      "name": "Rhode Island",
      "abbr": "RI"
  },
  {
      "name": "South Carolina",
      "abbr": "SC"
  },
  {
      "name": "South Dakota",
      "abbr": "SD"
  },
  {
      "name": "Tennessee",
      "abbr": "TN"
  },
  {
      "name": "Texas",
      "abbr": "TX"
  },
  {
      "name": "Utah",
      "abbr": "UT"
  },
  {
      "name": "Vermont",
      "abbr": "VT"
  },
  {
      "name": "Virginia",
      "abbr": "VA"
  },
  {
      "name": "Washington",
      "abbr": "WA"
  },
  {
      "name": "West Virginia",
      "abbr": "WV"
  },
  {
      "name": "Wisconsin",
      "abbr": "WI"
  },
  {
      "name": "Wyoming",
      "abbr": "WY"
  }
]

const HikeForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState("")
    const [state, setState] = useState(1)
    const dispatch = useDispatch()
    const history = useHistory();

    const onSubmit = async(e) => {
      e.preventDefault()
      const data = await dispatch(createHike(name, latitude, longitude, description, photo, state))
      console.log(data)
      history.push("/home")
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

    const updatePhoto = (e) => {
      setPhoto(e.target.value)
    }

    const updateState = (e) => {
      setState(e.target.value)
      console.log(state)
    }

    return (
        <div className="hike-form-page page">
        <MainNav />
        <div className="hike_form_content">
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
              name="name"
              onChange={updateName}
              value={name}
              required={true}
            ></input>
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              onChange={updateLatitude}
              value={latitude}
              required={true}
            ></input>
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              onChange={updateLongitude}
              value={longitude}
              required={true}
            ></input>
            <label>Description</label>
            <input
              type="text"
              name="description"
              onChange={updateDescription}
              value={description}
              required={true}
            ></input>
            <label>Cover Photo</label>
            <input
              type="url"
              name="photo"
              onChange={updatePhoto}
              value={photo}
              required={true}
            ></input>
            <label>State</label>
            <select 
            name="state_id"
            onChange={updateState}
            value={state}>
                {states.map((el, i) => (
                  <option value={i + 1} key={el.abbr}>{el.name}</option>
                ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
        </div>
      </div>
    )
}

export default HikeForm