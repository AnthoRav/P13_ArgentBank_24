// @ts-nocheck
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticated, clearAuth } from '../../redux/authSlice'
import { getUser, clearUser, fetchUserProfile } from '../../redux/userSlice'
import bankLogo from "../../assets/img/argentBankLogo.png";


function Header() {

  const dispatch = useDispatch()
  const isAuthenticated = useSelector(authenticated)
  const user = useSelector(getUser)

  useEffect(() => {
    if(isAuthenticated === true) {
      dispatch(fetchUserProfile())
    }
  }, [isAuthenticated, dispatch])

 
  function handleLogout() {
    dispatch(clearAuth())
    dispatch(clearUser())
  }

  return (
    <header className="nav">
      <Link to="/">
        <img src={bankLogo} alt="Argent Bank Logo" className="nav_logo" />
      </Link>
      <div className="navUser">
        {/* Affichage conditionnel des éléments du header si oui ou non le user est connecté */}
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="navUser_sign">
              <i className="fa fa-user-circle"></i> {user.firstName}
            </Link>
            <div className="navUser_sign" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Logout
            </div>
          </>
        ) : (
          <Link to="/login" className="navUser_sign">
            <i className="fa fa-user-circle"></i> Sign in
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
