import apiClient from "../apiClient";
import { Profile, ApiResponse } from "../../types";


export const profileAPI = {
    fetchProfile(id: string) {
      return apiClient.get<ApiResponse<Profile>>(`/holidaze/profiles/${id}`);
    },
     async updateProfile(id: string, profileData: Partial<Profile>) {
      const response = await apiClient.put<ApiResponse<Profile>>(`/holidaze/profiles/${id}`, profileData);
      return response.data.data
    },
    searchProfiles(query: string) {
      return apiClient.get<ApiResponse<Profile[]>>(`/holidaze/profiles/search`, { params: { q: query } });
    }
  };