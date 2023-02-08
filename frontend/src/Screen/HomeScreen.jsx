import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileScreen from "./ProfileScreen";
import { useLocation } from 'react-router-dom';


const HomeScreen = () => {
  const state = useSelector((state) => state.userLogin);
  const { userInfo } = state;
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(location, 'dsbjkb')
  return (
    <div>
      {
        location.state && (
          <h1>You just logged out from the browser</h1>

        )}
      {userInfo ? (
        <ProfileScreen />

      ) : (
        <h1>Please login</h1>
      )}


    </div>
  );
};

export default HomeScreen;
