import React from "react"
import fetchData from "../../../api/crud/read"
import { useState, useEffect } from "react";

function AvatarSection({profile}) {

  const [ profileData, setProfileData] = useState(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await fetchData("/holidaze/profiles/<name>/bookings"); 
        setProfileData(result); 
      } catch (error) {
        console.error('Failed to fetch data:', error); 
      }
    };

    loadProfile(); 
  }, []);
  return (
    <>
     <h1>This is userinfo</h1> 
    </>
  )
}

export default AvatarSection





