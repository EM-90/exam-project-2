import React, { useState, useEffect, FormEvent } from "react";
import LoginForm from "../../components/forms/loginForm";
import RegisterForm from "../../components/forms/registerForm";
import { useAuth } from "../../context/authContext";
import ProfileHeader from "../../components/profileContent/profileHeader";
import VenueForm from "../../components/forms/venueForm";
import Modal from "../../components/modal";
import PrimaryButton from "../../components/buttons/primaryButton";
import { profileAPI } from "../../api/profiles";
import { bookingAPI } from "../../api/booking";
import VenueManagerLi from "../../components/profileContent/venueManagerLi";
import { useNavigate } from "react-router-dom";
import useVenueForm from "../../hooks/useVenueForm";
import {
  handleCreate,
  handleUpdate,
  handleDelete,
} from "../../helpers/handlers";
import BookingLi from "../../components/profileContent/bookingLi";
import { FaPlus } from "react-icons/fa6";
import { Venue, Booking } from "../../types";

function Profile() {
  const { user } = useAuth();
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const toggleForm = () => setShowRegisterForm((prev) => !prev);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [formData, handleChange, resetFormData] = useVenueForm(selectedVenueId);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [showFeedbackMessage, setShowFeedbackMessage] =
    useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
  const [updatedVenueId, setUpdatedVenueId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [venueToDelete, setVenueToDelete] = useState<string | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleModal = () => setShowModal((prev) => !prev);

  const openModal = (venueId: string | null = null) => {
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (selectedVenueId) {
      await handleUpdate(event, selectedVenueId, formData);
      setFeedbackMessage("Updated");
      setIsSuccessMessage(false);
      setShowFeedbackMessage(true);
      setUpdatedVenueId(selectedVenueId);
      setTimeout(() => setShowFeedbackMessage(false), 1000);
      closeModal();
    } else {
      await handleCreate(event, formData, (newVenue: Venue) => {
        setVenues((prevVenues) => [newVenue, ...prevVenues]);
        setFeedbackMessage("New");
        setIsSuccessMessage(true);
        setShowFeedbackMessage(true);
        if (newVenue.id) {
          setUpdatedVenueId(newVenue.id);
        }
        setTimeout(() => setShowFeedbackMessage(false), 1000);
        closeModal();
      });
    }
  };

  const handleClick = (id: string | undefined) => {
    if (id) {
      console.log(`Navigating to venue with ID: ${id}`);
      navigate(`/venue/${id}`);
    }
  };

  const handleDeleteClick = (venueId: string | undefined) => {
    if (venueId) {
      setVenueToDelete(venueId);
      setShowConfirmModal(true);
    }
  };

  const handleBookingDeleteClick = (bookingId: string | undefined) => {
    if (bookingId) {
      setBookingToDelete(bookingId);
      setShowConfirmModal(true);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      await bookingAPI.deleteBooking(bookingId);
      setUserBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  const confirmDelete = async () => {
    if (venueToDelete) {
      await handleDelete(venueToDelete, setVenues, venues);
      setShowConfirmModal(false);
      setVenueToDelete(null);
    }
    if (bookingToDelete) {
      await handleDeleteBooking(bookingToDelete);
      setShowConfirmModal(false);
      setBookingToDelete(null);
    }
  };

  const fetchBookings = async () => {
    try {
      if (user?.name) {
        const bookingResponse = await profileAPI.fetchProfileBookings(
          user.name,
          "true"
        );
        const bookings = bookingResponse.data.data.bookings || [];
        const sortedBookings = bookings.sort(
          (a: Booking, b: Booking) =>
            new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime()
        );
        setUserBookings(sortedBookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.name) {
        try {
          const response = await profileAPI.fetchProfile(user.name);
          if (Array.isArray(response.data.data)) {
            setVenues(response.data.data);
          }
          await fetchBookings();
        } catch (error) {
          console.error("Failed to fetch data:", error);
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
                <h2 className="my-5 text-4xl font-regular mt-10 text-black">
                  My Venues
                </h2>
                <PrimaryButton
                  onClick={() => openModal()}
                  className="flex items-center gap-4 rounded-full shadow-lg py-2.5 px-5 mb-10 mt-5 bg-skin-infoBg text-skin-primary hover:bg-skin-primary hover:text-white text-lg"
                  disabled={false}
                >
                  <p>Add venue</p>
                  <FaPlus size={28} />
                </PrimaryButton>
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
                {venues.map((venue) => (
                  <VenueManagerLi
                    key={venue.id}
                    venue={venue}
                    onClick={() => handleClick(venue.id)}
                    onEdit={() => openModal(venue.id || null)}
                    onDelete={() => handleDeleteClick(venue.id)}
                    feedbackMessage={feedbackMessage}
                    showFeedbackMessage={
                      showFeedbackMessage && updatedVenueId === venue.id
                    }
                    isSuccessMessage={isSuccessMessage}
                  />
                ))}
              </section>
            </>
          )}
          <section>
            <h2 className="my-5 text-4xl font-regular mt-20 text-black">
              My Bookings
            </h2>
            {userBookings.map((booking) => (
              <BookingLi
                key={booking.id}
                booking={booking}
                onClick={() => handleClick(booking.venue.id)}
                onDelete={() => handleBookingDeleteClick(booking.id)}
              />
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
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
        >
          <div className="p-4 sm:flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-skin-primary">
              Confirm Delete
            </h2>
            <p>
              Are you sure you want to delete this{" "}
              {venueToDelete ? "venue" : "booking"}?
            </p>
            <div className="flex gap-4 justify-start sm:justify-between mt-4">
              <PrimaryButton
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 px-2 sm:px-7 sm:py-2 text-white"
                disabled={false}
              >
                Delete
              </PrimaryButton>
              <PrimaryButton
                onClick={() => setShowConfirmModal(false)}
                className="px-2 py-1 sm:px-7 sm:py-2 bg-gray-100 hover:bg-gray-200"
                disabled={false}
              >
                Cancel
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

export default Profile;
