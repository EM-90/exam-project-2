import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react'
import fetchData from "../../api/crud/read";
import DatePicker from "../calendar";

interface VenueMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

interface VenueLocation {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

interface VenueMedia {
  url: string;
  alt?: string;
}

interface VenueData {
  id: string;
  name: string;
  description: string;
  media: VenueMedia[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: VenueLocation;
}

function VenueDetails() {

    const { venueId } = useParams<string>();
    const [venueData, setVenueData] = useState<VenueData | null>(null) 

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
      
      if (!venueData) return <div>Loading venue details...</div>;

      return (
        <article className="container mx-auto my-7 px-7">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                {venueData.media && venueData.media.length > 0 && (
                <img src={venueData.media[0].url} alt={venueData.media[0].alt || 'Venue image'} className=" object-cover max-h-96  w-full rounded-lg shadow-md mb-4"/>
            )}
                    <div className="mt-4">
                        <h1 className="text-2xl font-bold">{venueData.name}</h1>
                        <p>{venueData.description}</p>
                    </div>
                    <div className="mt-4">
                      <ul className="list-none space-y-6">
                          <li><strong>Price:</strong> {venueData.price} per night</li>
                          <li><strong>Maximum Guests:</strong> {venueData.maxGuests}</li>
                          <li><strong>Rating:</strong> {venueData.rating}/5</li>
                          <li><strong>Address:</strong> {`${venueData.location.address}, ${venueData.location.city}, ${venueData.location.zip}, ${venueData.location.country}`}</li>
                          <li><strong>Facilities:</strong> Wifi ({venueData.meta.wifi ? "Yes" : "No"}), Parking ({venueData.meta.parking ? "Yes" : "No"}), Breakfast included ({venueData.meta.breakfast ? "Yes" : "No"}), Pets allowed ({venueData.meta.pets ? "Yes" : "No"})</li>
                      </ul>
                    </div>
                </div>
                <div>
                  <DatePicker/>
                </div>
            </section>
        </article>
    );
}

export default VenueDetails
