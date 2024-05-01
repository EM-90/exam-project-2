import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react'
import fetchData from "../../api/crud/read";

function VenueDetails() {

    const { venueId } = useParams();
    const [venueData, setVenueData] = useState(null) 

    useEffect(() => {
        const fetchVenueData = async () => {
          try {
            const result = await fetchData(`/holidaze/venues/${venueId}`); 
            setVenueData(result); 
          } catch (error) {
            console.error('Failed to fetch data:', error); 
          }
        };
    
        fetchVenueData(); 
      },[venueId]);
      console.log("My venue data",venueData);

  return (
    <section key={venueId}>
      <h1>Venue</h1>
    </section>
  )
}

export default VenueDetails
