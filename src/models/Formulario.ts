export interface Formulario {
  formn_id?: number; 
  formv_nombre_prog_formacion: string;
  formv_nombres: string;
  formv_apellidos: string;
  formd_fecha: string;
  formv_tipo_identificacion: string;
  formv_identificacion: string;
  formv_expedicion?: string;
  formv_direccion?: string;
  formv_telefono_fijo?: string;
  formv_correo_postulante?: string;
  formv_celular?: string;
  formv_empresa_laboral?: string;
  formv_cargo?: string;
  formv_direccion_oficina?: string;
  formv_telefono_oficina?: string;
  formv_correo_oficina?: string;
  formv_nivel_academico?: string;
  formv_universidad?: string;
  formv_nombre_prog_academico?: string;
  formv_year?: number;
  formv_egresado?: 'SI' | 'NO';
  formv_forma_pago?: string;
  formv_firma_base64?: string;
  formv_documento_base64?: string;
  formv_comprobante_pago_base64?: string;
}

export interface PreForm {
  preformv_nombres: string;
  preformv_apellidos: string;
  preformv_correo: string;
  preformv_fuentes: string;
}


export interface Fuente {
  id: number;
  fuente: string;
}

export interface Programa {
  id: number;
  programa: string;
}

export interface ProgramaResumen {
  formn_id: number;
  formv_nombre_prog_formacion: string;
  formv_nombres: string;
  formv_apellidos: string;
  formd_fecha: string;
  formv_identificacion: string;
  formv_correo_postulante: string;
  formv_celular: string;
  formv_forma_pago: string;
  fecha_formateada: string;
}

export interface TotalInscritos {
  total: number;
}

export interface ConteoPorPrograma {
  programa: string;
  total: number;
}
export interface ConteoPorfuente {
  fuente: string;
  total: number;
}

export interface TotalProgramas {
  total: number;
}

export interface ProgramaMasInscritos {
  programa: string;
  total_inscritos: number;
}

export interface FuenteMasInscritos {
  fuente: string;
  total_inscritos: number;
}

export interface UsuariosAdministradores {
  id: number;
  email: string;
  password: string;
}
