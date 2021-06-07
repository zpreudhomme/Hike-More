import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, firstName, lastName, profilePhoto, password));
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateProfilePhoto = (e) => {
    setProfilePhoto(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const goHome = (e) => {
    e.preventDefault();
    history.push('/')
  }

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
      <div className="signup page">
        <div className="signup_form_wrapper">
          <form onSubmit={onSignUp} className="signup_form">
          <div className="signup_logo" onClick={goHome}>
            Logo
          </div>
          <h2>Sign Up</h2>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <label>User Name</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              onChange={updateFirstName}
              value={firstName}
              required={true}
            ></input>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              onChange={updateLastName}
              value={lastName}
              required={true}
            ></input>
            <label>Profile Photo</label>
            <input
              type="text"
              name="profile_photo"
              onChange={updateProfilePhoto}
              value={profilePhoto}
            ></input>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
  );
};

export default SignUpForm;
