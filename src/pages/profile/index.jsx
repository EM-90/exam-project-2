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
import UpdateMessage from "../../components/messages/updateMessage";

function Profile() {
  const { user } = useAuth();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const toggleForm = () => setShowRegisterForm(prev => !prev);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState();
  const [venues, setVenues] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [formData, handleChange, resetFormData] = useVenueForm(selectedVenueId);
  const [updateMessage, setUpdateMessage] = useState('');
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const [updatedVenueId, setUpdatedVenueId] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedVenueId) {
      await handleUpdate(event, selectedVenueId, formData);
      setUpdateMessage('Updated');
      setShowUpdateMessage(true);
      setUpdatedVenueId(selectedVenueId);
      setTimeout(() => setShowUpdateMessage(false), 3000);
      closeModal();
    } else {
      await handleCreate(event, formData, (newVenue) => {
        setVenues((prevVenues) => [newVenue, ...prevVenues]);
        setUpdateMessage('Venue created successfully');
        setShowUpdateMessage(true);
        setUpdatedVenueId(newVenue.id);
        setTimeout(() => setShowUpdateMessage(false), 3000);
        closeModal();
      });
    }
  };

  const handleClick = (id) => {
    console.log(`Navigating to venue with ID: ${id}`);
    navigate(`/venue/${id}`);
  };

  const fetchBookings = async () => {
    try {
      const bookingResponse = await profileAPI.fetchProfileBookings(user.name, 'true');
      const sortedBookings = bookingResponse.data.data.bookings.sort((a, b) => new Date(b.created) - new Date(a.created));
      setUserBookings(sortedBookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.name) {
        try {
          const response = await profileAPI.fetchProfile(user.name);
          setVenues(response.data.data);
          await fetchBookings();
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
          {user.venueManager && (
            <>
              <section>
                <h2 className="my-5 text-4xl font-regular mt-10 text-black">My Venues</h2>
                <PrimaryButton
                  text="Add Venue"
                  onClick={() => openModal(null)}
                  className="my-4 w-full rounded-md py-2.5 bg-skin-createBg text-skin-primary hover:bg-skin-infoBg outline-dashed shadow-none"
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
                    updateMessage={updateMessage}
                    showUpdateMessage={showUpdateMessage && updatedVenueId === venue.id}
                  />
                ))}
              </section>
            </>
          )}
          <section>
            <h2 className="my-5 text-4xl font-regular mt-20 text-black">My Bookings</h2>
            {userBookings.map((booking) => (
              <BookingLi key={booking.id} booking={booking} onClick={() => handleClick(booking.venue.id)} />
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










