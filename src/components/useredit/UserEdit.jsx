// @ts-nocheck
import React, { useState, useEffect } from "react";
import GreenButton from "../greenbtn/GreenBtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticated } from '../../redux/authSlice'
import { getUser, fetchUserProfile, updateUserProfile, getUserError, clearEdit } from '../../redux/userSlice'

//import "./_userEdit.scss";

const UserEdit = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const isAuthenticated = useSelector(authenticated)
  const user = useSelector(getUser)
  const error = useSelector(getUserError)

  useEffect(() => {
    if(isAuthenticated === false) {
      navigate('/')
    }

    if(isAuthenticated === true) {
      dispatch(fetchUserProfile())
    }
  }, [isAuthenticated, dispatch, navigate])

  //btn edit
  const handleEditClick = () => {
    setIsEditing(true);
    dispatch(clearEdit())
  };

  //btn save
  const handleUpdateUserName = async () => {
    setIsEditing(false);
    //const isEdit = false
    //, isEdit
    const userDataToUpdate = {
      firstName, lastName
    }

    dispatch(updateUserProfile(userDataToUpdate))
  };

  //btn cancel
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="edit-form">
      {isEditing ? (
        <>
        <h1 className="welcome-user">
            Welcome back 
          </h1>
          <div className="edit">
            {/* <label htmlFor="firstName">First Name :</label> */}
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={user.firstName}
              className="text_input"
            />
          
            {/* <label htmlFor="lastName">Last Name :</label> */}
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={user.lastName}
              className="text_input"
            />
          </div>
          <div className="buttons-form">
            <GreenButton text="Save" onClick={handleUpdateUserName} />;
            <GreenButton text="Cancel" onClick={handleCancel} />;
          </div>
        </>
      ) : (
        <div className="edit-form ">
          <h1 className="welcome-user">
            Welcome back <br></br> {user.firstName} {user.lastName} !
          </h1>
          <GreenButton text="Edit Name" onClick={handleEditClick} />;
        </div>
      )}
    </div>
  );
};

export default UserEdit;
