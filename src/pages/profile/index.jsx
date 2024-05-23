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
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [updatedVenueId, setUpdatedVenueId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);
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
      setFeedbackMessage('Updated');
      setIsSuccessMessage(false);
      setShowFeedbackMessage(true);
      setUpdatedVenueId(selectedVenueId);
      setTimeout(() => setShowFeedbackMessage(false), 1000);
      closeModal();
    } else {
      await handleCreate(event, formData, (newVenue) => {
        setVenues((prevVenues) => [newVenue, ...prevVenues]);
        setFeedbackMessage('New');
        setIsSuccessMessage(true);
        setShowFeedbackMessage(true);
        setUpdatedVenueId(newVenue.id);
        setTimeout(() => setShowFeedbackMessage(false), 1000);
        closeModal();
      });
    }
  };

  const handleClick = (id) => {
    console.log(`Navigating to venue with ID: ${id}`);
    navigate(`/venue/${id}`);
  };

  const handleDeleteClick = (venueId) => {
    setVenueToDelete(venueId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    await handleDelete(venueToDelete, setVenues, venues);
    setShowConfirmModal(false);
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
                    onDelete={() => handleDeleteClick(venue.id)}
                    feedbackMessage={feedbackMessage}
                    showFeedbackMessage={showFeedbackMessage && updatedVenueId === venue.id}
                    isSuccessMessage={isSuccessMessage}
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
      {showConfirmModal && (
        <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-skin-primary">Confirm Delete</h2>
            <p>Are you sure you want to delete this venue?</p>
            <div className="flex gap-7 justify-end mt-4">
              <PrimaryButton onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 px-7 py-2 text-white">Delete</PrimaryButton>
              <PrimaryButton onClick={() => setShowConfirmModal(false)} className="mr-2 px-7 py-2 border hover:bg-gray-200">Cancel</PrimaryButton>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

export default Profile;











