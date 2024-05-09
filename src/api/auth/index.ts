import { User, ApiResponse } from "../../types";
import apiClient from "../apiClient";

export const authAPI = {
    async login(data: { email: string; password: string }): Promise<User> {
      const response = await apiClient.post<ApiResponse<User>>('/auth/login', data);
      return response.data.data;
    },
   
    async register(data: { name: string; email: string; password: string }): Promise<User> {
      const response = await apiClient.post<ApiResponse<User>>('/auth/register', data);
      return response.data.data;
    }
  };