import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, authenticated, authenticationError, clearErrorAuth } from '../../redux/authSlice'
import { useNavigate } from "react-router-dom";
import GreenButton from "../greenbtn/GreenBtn";

//import "./_signinform.scss";

function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const isAuthenticated = useSelector(authenticated)
  const error = useSelector(authenticationError)

  useEffect(() => {
    if(isAuthenticated === true) {
      navigate('/profile')
    }
  }, [navigate, isAuthenticated])

  useEffect(() => {
    dispatch(clearErrorAuth())
  }, [dispatch])

 
  function handleSubmit(event) {
    event.preventDefault()

    const authInformations = {
      userName, password, rememberMe
    }

    dispatch(authenticate(authInformations))
  }


  return (
    <div className="formulaire">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1 className="formulaire_titleFormulaire">Sign In</h1>
      {error && <p className="formulaire_errors">{error}</p>}
      <form className="formulaire_form">
        <div className="formulaire_form-input">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="formulaire_form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="formulaire_remember">
          <input
            type="checkbox"
            id="remember-me"
            className="formulaire_remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="remember-me" htmlFor="remember-me">
            Remember me
          </label>
        </div>
        <GreenButton text="Sign In" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default SignInForm;
