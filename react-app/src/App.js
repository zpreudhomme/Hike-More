import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Splash from "./components/Splash"
import MainUI from "./components/MainUI"
import HikeForm from "./components/HikeForm"
import Hike from "./components/Hike"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
require('dotenv').config()

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} >
          <Splash />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/home" exact={true}>
          <MainUI />
        </Route>
        <ProtectedRoute path="/new-hike">
          <HikeForm />
        </ProtectedRoute>
        <Route path="/hike/:id">
          <Hike />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
