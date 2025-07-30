// src/services/authService.ts
import axios from 'axios';

const apiBaseURL = `${import.meta.env.VITE_API_URL}/auth`;

// Tipamos la respuesta esperada
interface LoginResponse {
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${apiBaseURL}/login`, { email, password });
    return response.data;
  }
};
