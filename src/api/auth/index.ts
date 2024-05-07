import { Auth, ApiResponse } from "../../types";
import apiClient from "../apiClient";

export const authAPI = {
    async login(data: { email: string; password: string }): Promise<ApiResponse<Auth>> {
      const response = await apiClient.post<ApiResponse<Auth>>('/auth/login', data);
      return response.data;
    },
   
    async register(data: { name: string; email: string; password: string }): Promise<ApiResponse<Auth>> {
      const response = await apiClient.post<ApiResponse<Auth>>('/auth/register', data);
      return response.data;
    }
  };