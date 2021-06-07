import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
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

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="login page">
      <div className="login_form_wrapper">
        <div className="login_logo" onClick={goHome}>
          Logo
        </div>
        <h2>Login</h2>
        <form onSubmit={onLogin} class="login_form">
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
            <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
