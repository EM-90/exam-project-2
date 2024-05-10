import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DatePicker from "../calendar";
import { FaCat, FaWifi, FaEgg, FaSquareParking } from "react-icons/fa6";
import { venueAPI } from "../../api/venue";
import { Venue, } from "../../types";
import ProfileBadge from "../profileContent/profileHeader/profileBadge";


function VenueDetails() {

    const { venueId } = useParams<{ venueId: string }>();
    const [venueData, setVenueData] = useState<Venue | null>(null) 
   // let navigate = useNavigate();

    //const handleClick = (id) => {
    //  navigate(`/venue/${id}`);
    //}

    useEffect(() => {
        const fetchVenueData = async () => {

          if(venueId) {
            try {
              const response = await venueAPI.fetchVenueById(venueId, true, true); 
              setVenueData(response.data.data);
              console.log(response);
            } catch (error) {
              console.error('Failed to fetch data:', error); 
            }
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
                    <section className="mt-4">
                      <ul className="list-none space-y-6">
                          <li><strong>Price:</strong> {venueData.price}Kr per night</li>
                          <li><strong>Maximum Guests:</strong> {venueData.maxGuests}</li>
                          <li><strong>Rating:</strong> {venueData.rating}/5</li>
                          <li><strong>Address:</strong> {`${venueData.location.address}, ${venueData.location.city}, ${venueData.location.zip}, ${venueData.location.country}`}</li>
                      </ul>
                      <section className="mt-7">
                          <h3 className=" font-bold text-xl">This place can offer</h3>
                        <ul className="w-full mt-4 flex gap-7 flex-wrap">
                          <div className=" flex flex-col gap-7">
                            <li className=" flex gap-2 items-center"><FaWifi size={32} className=" text-skin-primary"/><strong>Wifi</strong> ({venueData.meta.wifi ? "Yes" : "No"})</li>
                            <li className=" flex gap-2  items-center"><FaSquareParking size={32} className=" text-skin-primary"/><strong>Parking</strong> ({venueData.meta.parking ? "Yes" : "No"})</li>
                          </div>
                          <div className=" flex flex-col gap-7">
                            <li className=" flex gap-2  items-center"><FaEgg size={32} className=" text-skin-primary"/><strong>Breakfast included</strong> ({venueData.meta.breakfast ? "Yes" : "No"})</li>
                            <li className=" flex gap-2  items-center"><FaCat size={32} className=" text-skin-primary"/><strong>Pets allowed</strong> ({venueData.meta.pets ? "Yes" : "No"})</li>
                          </div>
                        </ul>
                        <ProfileBadge name={venueData.name}/>
                      </section>
                    </section>
                    
                </div>
                <div className="w-full">
                   <h3>Select your booking period</h3>
                    <DatePicker/>
                    <button className=" w-1/3 py-2 bg-skin-createBg text-skin-primary hover:bg-skin-primary hover:text-white rounded-md hover:bg-skin-primay border-skin-primary"> book this venue period</button>
                </div>
            </section>
        </article>
    );
}

export default VenueDetails
