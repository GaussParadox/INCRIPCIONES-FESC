import axios from 'axios';
import type { Formulario, Programa, ProgramaResumen, ConteoPorPrograma, TotalInscritos, TotalProgramas, ProgramaMasInscritos  } from '../models/Formulario';

const apiBaseURL = 'http://localhost:3000/api/form';

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
},

  getProgramas: async (): Promise<Programa[]> => {
    const response = await axios.get(`${apiBaseURL}/programas`);
    return response.data as Programa[];
},

postCrearPrograma: async (programa: string): Promise<{ message: string }> => {
  const response = await axios.post<{ message: string }>(`${apiBaseURL}/programas`, { programa });
  return response.data;
},

  deletePrograma: async (id: number): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${apiBaseURL}/programas/${id}`);
  return response.data;
},


  getFormulariosResumen: async (): Promise<ProgramaResumen[]> => {
    const response = await axios.get(`${apiBaseURL}/formularios/resumen`);
    return response.data as ProgramaResumen[];
},

  getTotalInscritos: async (): Promise<TotalInscritos> => {
  const response = await axios.get(`${apiBaseURL}/totalinscritos`);
  return response.data as TotalInscritos;
},

  getConteoPorPrograma: async (): Promise<ConteoPorPrograma[]> => {
  const response = await axios.get(`${apiBaseURL}/totalesporprograma`);
  return response.data as ConteoPorPrograma[];
},

  getTotalProgramas: async (): Promise<TotalProgramas> => {
  const response = await axios.get<TotalProgramas>(`${apiBaseURL}/totalprogramas`);
  return response.data;
},

getProgramaConMasInscritos: async (): Promise<ProgramaMasInscritos> => {
  const response = await axios.get<ProgramaMasInscritos>(`${apiBaseURL}/programa-mas-inscritos`);
  return response.data;
},




};
