import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import DateRangePicker from "../calendar";
import { FaCat, FaWifi, FaEgg, FaSquareParking } from "react-icons/fa6";
import { venueAPI } from "../../api/venue";
import { Venue, Booking } from "../../types";
import ProfileBadge from "../profileContent/profileHeader/profileBadge";
import { handleBookingSubmit } from "../../helpers/handlers";

const VenueDetails: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [venueData, setVenueData] = useState<Venue | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

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
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchVenueData();
  }, [venueId]);

  if (!venueData) return <div>Loading venue details...</div>;

  const handleSubmit = (bookingData: {
    dateFrom: Date;
    dateTo: Date;
    guests: number;
  }) => {
    if (venueId) {
      handleBookingSubmit(venueId, bookingData, navigate);
    } else {
      alert("Venue ID is not available.");
    }
  };

  const isVenueManager =
    user?.venueManager && user?.name === venueData?.owner?.name;
  const isOwner = !!(user && user.name === venueData?.owner?.name);

  return (
    <article className="container mx-auto my-7 px-7">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {venueData.media && venueData.media.length > 0 && (
            <img
              src={venueData.media[0].url}
              alt={venueData.media[0].alt || "Venue image"}
              className="object-cover max-h-96 w-full rounded-lg shadow-md mb-4"
            />
          )}
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{venueData.name}</h1>
            <p className="text-lg">{venueData.description}</p>
          </div>
          <section className="mt-6">
            <ul className="flex flex-col md:flex-row list-none gap-5 md:gap-16 mb-8">
              <li className="font-medium text-lg">
                <span className="text-3xl align-middle text-skin-primary">
                  ${venueData.price}
                </span>{" "}
                Night
              </li>
              <li className="font-medium text-lg">
                <span className="text-3xl align-middle text-skin-primary font-medium">
                  {venueData.maxGuests}
                </span>{" "}
                Guests
              </li>
              <li className="font-medium text-lg">
                <span className="text-3xl align-middle text-skin-primary font-medium">
                  {venueData.rating}/5
                </span>{" "}
                Rating
              </li>
            </ul>
            <div className="font-medium text-lg">
              <h4 className="text-3xl mb-2">Address</h4>
              {`${venueData.location.address}, ${venueData.location.city}, ${venueData.location.zip}, ${venueData.location.country}`}
            </div>
            <section className="mt-7">
              <h3 className="font-bold text-xl">This place can offer</h3>
              <ul className="mt-4 flex gap-1 flex-wrap font-medium">
                <div className="flex flex-col gap-1">
                  <li className="bg-skin-infoBg px-3 py-1 text-skin-primary rounded-full border-skin-InputBorder border-2 flex gap-2 items-center">
                    <FaWifi size={20} className="text-skin-primary" />
                    Wifi ({venueData.meta.wifi ? "Yes" : "No"})
                  </li>
                  <li className="bg-skin-infoBg px-3 py-1 text-skin-primary rounded-full border-skin-InputBorder border-2 flex gap-2 items-center">
                    <FaSquareParking size={20} className="text-skin-primary" />
                    Parking ({venueData.meta.parking ? "Yes" : "No"})
                  </li>
                </div>
                <div className="flex flex-col gap-1">
                  <li className="bg-skin-infoBg px-3 py-1 text-skin-primary rounded-full border-skin-InputBorder border-2 flex gap-2 items-center">
                    <FaEgg size={20} className="text-skin-primary" />
                    Breakfast included (
                    {venueData.meta.breakfast ? "Yes" : "No"})
                  </li>
                  <li className="bg-skin-infoBg px-3 py-1 text-skin-primary rounded-full border-skin-InputBorder border-2 flex gap-2 items-center">
                    <FaCat size={20} className="text-skin-primary" />
                    Pets allowed ({venueData.meta.pets ? "Yes" : "No"})
                  </li>
                </div>
              </ul>
            </section>
          </section>
          <div className="my-8">
            <h3 className="text-xl font-bold mt-10 mb-4">
              Owner of this venue
            </h3>
            {venueData.owner && (
              <ProfileBadge
                name={venueData.owner.name}
                email={venueData.owner.email}
                avatarUrl={venueData.owner.avatar?.url}
                avatarAlt={venueData.owner.avatar?.alt}
                owner={venueData.owner}
              />
            )}
          </div>
        </div>
        <section className="bookingAndCustomerContainer w-full flex flex-col items-center xs:block sm:block md:block">
          {isVenueManager && (
            <section className="mt-8 md:mt-0 mb-8 h-96 overflow-auto rounded-md w-full">
              <h3 className="sticky top-0 z-40 text-2xl text-skin-primary bg-skin-createBg font-md p-4">
                Your customers
              </h3>
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="shadow-md border bg-white p-4 rounded mb-2"
                >
                  <div className="flex flex-wrap items-center">
                    <img
                      src={booking.customer.avatar?.url}
                      alt={booking.customer.avatar?.alt || "User avatar"}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="flex flex-wrap w-full sm:flex-nowrap justify-between">
                      <div className="w-full sm:w-auto">
                        <p className="font-semibold">{booking.customer.name}</p>
                        <p>{booking.customer.email}</p>
                      </div>
                      <div className="font-medium text-left sm:text-right text-lg w-full sm:w-auto mt-2 sm:mt-0">
                        <p>
                          From:{" "}
                          <span className="text-skin-primary pl-2">
                            {new Date(booking.dateFrom).toLocaleDateString()}
                          </span>
                        </p>
                        <p>
                          To:{" "}
                          <span className="text-skin-primary pl-2">
                            {new Date(booking.dateTo).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}
          <DateRangePicker
            onSubmit={handleSubmit}
            bookings={bookings}
            pricePerNight={venueData.price}
            isOwner={isOwner}
          />
        </section>
      </section>
    </article>
  );
};

export default VenueDetails;
