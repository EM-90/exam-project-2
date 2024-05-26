import { FormEvent } from "react";
import { venueAPI } from "../../api/venue";
import { bookingAPI } from "../../api/booking";
import { NewBooking } from "../../types";
import { useNavigate } from "react-router-dom";

export const handleUpdate = async (
  event: FormEvent,
  venueId: string,
  formData: any
) => {
  event.preventDefault();
  try {
    const response = await venueAPI.updateVenue(venueId, formData);
    console.log(response);
  } catch (error) {
    console.error("Failed to update venue:", error);
    alert("Failed to update venue.");
  }
};

export const handleCreate = async (
  event: FormEvent,
  formData: any,
  onSuccess: (newVenue: any) => void
) => {
  event.preventDefault();
  try {
    const response = await venueAPI.createVenue(formData);
    const newVenue = response.data.data;
    onSuccess(newVenue);
  } catch (error) {
    console.error("Failed to create venue:", error);
    alert("Failed to create venue.");
  }
};

export const handleDelete = async (
  id: string,
  setVenues: React.Dispatch<React.SetStateAction<any[]>>,
  venues: any[]
) => {
  try {
    await venueAPI.deleteVenue(id);
    setVenues(venues.filter((venue) => venue.id !== id));
  } catch (error) {
    console.error("Failed to delete venue:", error);
  }
};

export const handleBookingSubmit = async (
  venueId: string,
  bookingData: { dateFrom: Date; dateTo: Date; guests: number },
  navigate: ReturnType<typeof useNavigate>
) => {
  try {
    const newBooking: NewBooking = {
      dateFrom: bookingData.dateFrom.toISOString(),
      dateTo: bookingData.dateTo.toISOString(),
      guests: bookingData.guests,
      venueId: venueId,
    };

    const response = await bookingAPI.createBooking(newBooking);

    if (response.data) {
      alert("Booking successful!");
      navigate("/profile");
    }
  } catch (error) {
    console.error("Error creating booking", error);
    alert("Failed to create booking. Please try again.");
  }
};
