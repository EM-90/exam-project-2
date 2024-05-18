import React, { useState, useEffect } from "react";
import LoginForm from "../../components/forms/loginForm";
import RegisterForm from "../../components/forms/registerForm";
import { useAuth } from '../../context/authContext';
import ProfileHeader from "../../components/profileContent/profileHeader";
import VenueForm from "../../components/forms/venueForm";
import Modal from "../../components/modal";
import PrimaryButton from "../../components/buttons/primaryButton";
import { profileAPI } from "../../api/profiles";
import VenueManagerLi from "../../components/profileContent/venueManagerLi";
import { useNavigate } from "react-router-dom";
import useVenueForm from "../../hooks/useVenueForm";
import { handleCreate, handleUpdate, handleDelete } from "../../helpers/handlers";
import BookingLi from "../../components/profileContent/bookingLi";

function Profile() {
  const { user } = useAuth();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const toggleForm = () => setShowRegisterForm(prev => !prev);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState();
  const [venues, setVenues] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [formData, handleChange, resetFormData] = useVenueForm(selectedVenueId);
  let navigate = useNavigate();

  const toggleModal = () => setShowModal(prev => !prev);

  const openModal = (venueId) => {
    setSelectedVenueId(venueId);
    if (!venueId) {
      resetFormData();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVenueId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedVenueId) {
      handleUpdate(event, selectedVenueId, formData);
    } else {
      handleCreate(event, formData);
    }
    closeModal();
  };

  const handleClick = (id) => {
    navigate(`/venue/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.name) {
        try {
          const response = await profileAPI.fetchProfile(user.name);
          setVenues(response.data.data);

          const bookingResponse = await profileAPI.fetchProfileBookings(user.name, 'true');
          setUserBookings(bookingResponse.data.data.bookings); 
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <main className="container mx-auto my-7 px-7 z-10">
      {user ? (
        <>
          <ProfileHeader />
          <section>
            <h2 className="my-5 text-5xl font-light text-skin-tagTextColor">Venues you manage</h2>
            <PrimaryButton
              text="Add Venue"
              onClick={() => openModal(null)}
              className="my-4 w-full rounded-md py-2.5 bg-skin-createBg text-skin-tagTextColor hover:bg-skin-infoBg outline-dashed outline-cyan-950 shadow-none"
              disabled={false}
            />
            <Modal isOpen={showModal} onClose={toggleModal}>
              <VenueForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
                venueId={selectedVenueId}
              />
            </Modal>
          </section>
          <section>
            {venues.map(venue => (
              <VenueManagerLi
                key={venue.id}
                venue={venue}
                onClick={() => handleClick(venue.id)}
                onEdit={() => openModal(venue.id)}
                onDelete={() => handleDelete(venue.id, setVenues, venues)}
              />
            ))}
          </section>
          <section>
            <h2 className="my-7 pt-5 text-5xl font-light text-skin-tagTextColor">Your Bookings</h2>
            {userBookings.map(booking => (
              <BookingLi key={booking.id} booking={booking} />
            ))}
          </section>
        </>
      ) : (
        <section>
          {showRegisterForm ? (
            <RegisterForm onLoginClick={toggleForm} />
          ) : (
            <LoginForm onRegisterClick={toggleForm} />
          )}
        </section>
      )}
    </main>
  );
}

export default Profile;





