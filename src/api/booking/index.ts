import apiClient from "../apiClient";
import { Booking, ApiResponse, NewBooking } from "../../types";

export const bookingAPI = {
  fetchBookings() {
    return apiClient.get<ApiResponse<Booking[]>>("/holidaze/bookings");
  },
  fetchBookingById(id: string) {
    return apiClient.get<ApiResponse<Booking>>(`/holidaze/bookings/${id}`);
  },
  createBooking(bookingData: NewBooking) {
    return apiClient.post<ApiResponse<Booking>>(
      "/holidaze/bookings",
      bookingData
    );
  },
  updateBooking(id: string, bookingData: Partial<Booking>) {
    return apiClient.put<ApiResponse<Booking>>(
      `/holidaze/bookings/${id}`,
      bookingData
    );
  },
  deleteBooking(id: string): Promise<ApiResponse<{}>> {
    return apiClient.delete<ApiResponse<{}>>(`/holidaze/bookings/${id}`);
  },
};
