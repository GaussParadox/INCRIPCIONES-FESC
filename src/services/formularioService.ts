import axios from 'axios';
import type { Formulario } from '../models/Formulario';

const apiBaseURL = 'http://localhost:3000/api'; 

export const formularioService = {

  postGuardarFormulario: async (formulario: Formulario): Promise<any> => {
    const response = await axios.post(`${apiBaseURL}/formulario`, formulario);
    return response.data;
  },


  getFormularios: async (): Promise<Formulario[]> => {
    const response = await axios.get(`${apiBaseURL}/formularios`);
    return response.data as Formulario[];
  },

  getFormularioById: async (id: number): Promise<Formulario> => {
  const response = await axios.get(`${apiBaseURL}/formulario/${id}`);
  return response.data as Formulario;
}
};
