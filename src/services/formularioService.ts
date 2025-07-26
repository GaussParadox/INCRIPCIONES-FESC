import axios from 'axios';
import type { Formulario, ConteoPorfuente ,Programa, ProgramaResumen, ConteoPorPrograma, TotalInscritos, TotalProgramas, ProgramaMasInscritos, Fuente, PreForm, FuenteMasInscritos  } from '../models/Formulario';

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

descargarExcel: async (): Promise<void> => {
  const response = await axios.get<Blob>(`${apiBaseURL}/formularios/excel`, {
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Inscritos cursos FESC 2025.xlsx'); 
  document.body.appendChild(link);
  link.click();
  link.remove();
},

descargarPDF: async (id: number): Promise<void> => {
  const response = await axios.get(`${apiBaseURL}/formulario/pdf/${id}`, {
    responseType: 'blob',
  });

  const blob = response.data as Blob;  
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Formulario_${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
},

 getProgramas: async (): Promise<Programa[]> => {
    const response = await axios.get(`${apiBaseURL}/programas`);
    return response.data as Programa[];
},

  getFuentes: async (): Promise<Fuente[]> => {
    const response = await axios.get(`${apiBaseURL}/fuentes`);
    return response.data as Fuente[];
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

getConteoPorFuente: async (): Promise<ConteoPorfuente[]> => {
  const response = await axios.get(`${apiBaseURL}/totalesporfuente`);
  return response.data as ConteoPorfuente[];
},

  getTotalProgramas: async (): Promise<TotalProgramas> => {
  const response = await axios.get<TotalProgramas>(`${apiBaseURL}/totalprogramas`);
  return response.data;
},

getProgramaConMasInscritos: async (): Promise<ProgramaMasInscritos> => {
  const response = await axios.get<ProgramaMasInscritos>(`${apiBaseURL}/programa-mas-inscritos`);
  return response.data;
},

getFuenteConMasInscritos: async (): Promise<FuenteMasInscritos> => {
  const response = await axios.get<FuenteMasInscritos>(`${apiBaseURL}/fuente-mas-inscritos`);
  return response.data;
},

postGuardarPreinscripcion: async (preForm: PreForm): Promise<{ message: string }> => {
  const response = await axios.post<{ message: string }>(`${apiBaseURL}/formulario/preinscripcion`, preForm);
  return response.data;
},





};
