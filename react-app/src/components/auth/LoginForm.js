import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import logo from '../../assets/images/hike-more.png'
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const goHome = (e) => {
    e.preventDefault();
    history.push('/')
  }

  const demoLogin = () => {
    dispatch(login("Demo","password"))
  }

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="login page">
      <div className="login_form_wrapper">
        <img className="login_logo" src={logo} onClick={goHome}/>
        <h2>Log in</h2>
        <form onSubmit={onLogin} className="login_form">
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={updateUsername}
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <div className="login_buttons">
              <button type="submit" id="login_submit">Log in</button>
              <button type="button" onClick={demoLogin} id="demo_login">Demo User</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
