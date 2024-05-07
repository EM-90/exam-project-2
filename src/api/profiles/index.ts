import apiClient from "../apiClient";
import { Profile, ApiResponse } from "../../types";


export const profileAPI = {
    fetchProfile(id: string) {
      return apiClient.get<ApiResponse<Profile>>(`/holidaze/profiles/${id}`);
    },
    updateProfile(id: string, profileData: Partial<Profile>) {
      return apiClient.put<ApiResponse<Profile>>(`/holidaze/profiles/${id}`, profileData);
    },
    searchProfiles(query: string) {
      return apiClient.get<ApiResponse<Profile[]>>(`/holidaze/profiles/search`, { params: { q: query } });
    }
  };