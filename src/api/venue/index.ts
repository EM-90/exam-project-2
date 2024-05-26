import apiClient from "../apiClient";
import { Venue, ApiResponse } from "../../types";

export const venueAPI = {
  fetchAllVenues() {
    return apiClient.get<ApiResponse<Venue[]>>("/holidaze/venues");
  },
  fetchVenueById(
    id: string,
    includeOwner: boolean = false,
    includeBookings: boolean = false
  ) {
    const queryParams = new URLSearchParams();
    if (includeOwner) {
      queryParams.append("_owner", "true");
    }
    if (includeBookings) {
      queryParams.append("_bookings", "true");
    }
    return apiClient.get<ApiResponse<Venue>>(
      `/holidaze/venues/${id}?${queryParams.toString()}`
    );
  },
  createVenue(data: Venue) {
    return apiClient.post<ApiResponse<Venue>>("/holidaze/venues", data);
  },
  updateVenue(id: string, data: Venue) {
    return apiClient.put<ApiResponse<Venue>>(`/holidaze/venues/${id}`, data);
  },
  deleteVenue(id: string) {
    return apiClient.delete<ApiResponse<{}>>(`/holidaze/venues/${id}`);
  },
  searchVenues(query: string) {
    return apiClient.get<ApiResponse<Venue[]>>(`/holidaze/venues/search`, {
      params: { q: query },
    });
  },
};
