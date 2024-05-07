import apiClient from "../apiClient";
import { Venue, ApiResponse } from "../../types";

export const venueAPI = {
    fetchAllVenues() {
      return apiClient.get<ApiResponse<Venue[]>>('/holidaze/venues');
    },
    fetchVenueById(id: string) {
      return apiClient.get<ApiResponse<Venue>>(`/holidaze/venues/${id}`);
    },
    createVenue(data: Venue) {
      return apiClient.post<ApiResponse<Venue>>('/holidaze/venues', data);
    },
    updateVenue(id: string, data: Venue) {
      return apiClient.put<ApiResponse<Venue>>(`/holidaze/venues/${id}`, data);
    },
    deleteVenue(id: string) {
      return apiClient.delete<ApiResponse<{}>>(`/holidaze/venues/${id}`);
    },
    searchVenues(query: string) {
      return apiClient.get<ApiResponse<Venue[]>>(`/holidaze/venues/search`, { params: { q: query } });
    }
  };