import apiClient from "../apiClient";
import { Profile, ApiResponse } from "../../types";


export const profileAPI = {
    fetchProfile(name: string) {
      return apiClient.get<ApiResponse<Profile>>(`/holidaze/profiles/${name}/venues`);
    },
    fetchProfileBookings(name: string, includeBookings: string) {
      const queryParams = new URLSearchParams();
      if (includeBookings) {
        queryParams.append('_bookings', 'true');
      }
      return apiClient.get<ApiResponse<Profile>>(`/holidaze/profiles/${name}?${queryParams.toString()}`);
    },
     async updateProfile(id: string, profileData: Partial<Profile>) {
      const response = await apiClient.put<ApiResponse<Profile>>(`/holidaze/profiles/${id}`, profileData);
      return response.data.data
    },
    searchProfiles(query: string) {
      return apiClient.get<ApiResponse<Profile[]>>(`/holidaze/profiles/search`, { params: { q: query } });
    }
  };