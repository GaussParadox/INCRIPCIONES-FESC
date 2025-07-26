// src/services/authService.ts
import axios from 'axios';

const apiBaseURL = 'http://localhost:3000/api/auth';

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
