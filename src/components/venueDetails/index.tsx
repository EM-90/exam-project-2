import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DateRangePicker from '../calendar';
import { FaCat, FaWifi, FaEgg, FaSquareParking } from 'react-icons/fa6';
import { venueAPI } from '../../api/venue';
import { Venue, Booking } from '../../types';
import ProfileBadge from '../profileContent/profileHeader/profileBadge';
import { handleBookingSubmit } from '../../helpers/handlers';

const VenueDetails: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [venueData, setVenueData] = useState<Venue | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  let navigate = useNavigate();
  
  useEffect(() => {
    const fetchVenueData = async () => {
      if (venueId) {
        try {
          console.log(`Fetching data for venue ID: ${venueId}`);
          const response = await venueAPI.fetchVenueById(venueId, true, true);
          setVenueData(response.data.data);
          console.log("Venue Data:", response.data.data);
          
          const { bookings } = response.data.data;
          if (bookings && bookings.length > 0) {
            setBookings(bookings);
            console.log("Fetched Bookings: ", bookings);
          } else {
            console.log("No bookings found.");
          }
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }
    };

    fetchVenueData();
  }, [venueId]);

  if (!venueData) return <div>Loading venue details...</div>;

  const handleSubmit = (bookingData: { dateFrom: Date; dateTo: Date; guests: number }) => {
    if (venueId) {
      handleBookingSubmit(venueId, bookingData, navigate);
    } else {
      alert("Venue ID is not available.");
    }
  };

  return (
    <article className="container mx-auto my-7 px-7">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {venueData.media && venueData.media.length > 0 && (
            <img src={venueData.media[0].url} alt={venueData.media[0].alt || 'Venue image'} className="object-cover max-h-96 w-full rounded-lg shadow-md mb-4" />
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
              <h3 className="font-bold text-xl">This place can offer</h3>
              <ul className="w-full mt-4 flex gap-7 flex-wrap">
                <div className="flex flex-col gap-7">
                  <li className="flex gap-2 items-center"><FaWifi size={32} className="text-skin-primary" /><strong>Wifi</strong> ({venueData.meta.wifi ? "Yes" : "No"})</li>
                  <li className="flex gap-2 items-center"><FaSquareParking size={32} className="text-skin-primary" /><strong>Parking</strong> ({venueData.meta.parking ? "Yes" : "No"})</li>
                </div>
                <div className="flex flex-col gap-7">
                  <li className="flex gap-2 items-center"><FaEgg size={32} className="text-skin-primary" /><strong>Breakfast included</strong> ({venueData.meta.breakfast ? "Yes" : "No"})</li>
                  <li className="flex gap-2 items-center"><FaCat size={32} className="text-skin-primary" /><strong>Pets allowed</strong> ({venueData.meta.pets ? "Yes" : "No"})</li>
                </div>
              </ul>
            </section>
          </section>
          <div className="my-8">
            <h3 className="text-xl font-bold my-4 py-6">Owner of this venue</h3>
            {venueData.owner && <ProfileBadge
              name={venueData.owner.name}
              email={venueData.owner.email}
              avatarUrl={venueData.owner.avatar?.url}
              avatarAlt={venueData.owner.avatar?.alt}
              owner={venueData.owner}
            />}
          </div>
        </div>
        <div className="w-full">
          <h3>Select your booking period</h3>
          <DateRangePicker onSubmit={handleSubmit} bookings={bookings} />
        </div>
      </section>
    </article>
  );
};

export default VenueDetails;


