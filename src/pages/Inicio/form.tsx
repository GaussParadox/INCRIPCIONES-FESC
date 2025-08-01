import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import type { Formulario } from '@/models/Formulario';
import {formularioService} from '@/services/formularioService';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const Form: React.FC = () => {
    const camposObligatorios = [
        "formv_nombre_prog_formacion",
        "formv_nombres",
        "formv_apellidos",
        "formv_correo_postulante",
        "formv_tipo_identificacion",
        "formv_identificacion",
        "formv_expedicion",
        "formv_direccion",
        "formv_celular",
        "formv_nivel_academico",
        "formv_universidad",
        "formv_nombre_prog_academico",
        "formv_forma_pago"
    ];
    const formRef = useRef<HTMLFormElement>(null);
    const [visible, setVisible] = useState(false);
    const [fechaFinalizacion, setFechaFinalizacion] = useState<Date | null>(null);
    const [egresadoFESC, setEgresadoFESC] = useState<boolean | null>(null);
    const [aceptaTerminos, setAceptaTerminos] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [Programa, setProgramas] = useState<{ id: number; programa: string }[]>([]);

    const [Formulario, setFormulario] = useState<Formulario>({
        formd_fecha: new Date().toISOString().split("T")[0],
        formv_nombre_prog_formacion: "",
        formv_nombres: "",
        formv_apellidos: "",
        formv_correo_postulante: "",
        formv_tipo_identificacion: "",
        formv_identificacion: "",
        formv_expedicion: "",
        formv_direccion: "",
        formv_telefono_fijo: "",
        formv_celular: "",
        formv_empresa_laboral: "",
        formv_cargo: "",
        formv_direccion_oficina: "",
        formv_telefono_oficina: "",
        formv_correo_oficina: "",
        formv_nivel_academico: "",
        formv_universidad: "",
        formv_nombre_prog_academico: "",
        formv_year: 0,
        formv_egresado: undefined,
        formv_forma_pago: ""
    });

    const toast = useRef<Toast>(null);

    const handleInputChange = (field: keyof Formulario, value: string | boolean | number) => {
        setFormulario((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    // Validación automática del formulario
    useEffect(() => {
        const allFieldsFilled = camposObligatorios.every(
            (field) => Formulario[field as keyof Formulario] !== "" && Formulario[field as keyof Formulario] !== undefined
        );
        setIsFormValid(allFieldsFilled && aceptaTerminos);
    }, [Formulario, aceptaTerminos]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
        const yearFromFechaFinalizacion = fechaFinalizacion
            ? new Date(fechaFinalizacion).getFullYear()
            : undefined;
        const egresado = egresadoFESC === null ? undefined : egresadoFESC ? "SI" : "NO";

        const dataAEnviar: Formulario = {
            ...Formulario,
            formv_year: yearFromFechaFinalizacion,
            formv_egresado: egresado,
        };

        const response = await formularioService.postGuardarFormulario(dataAEnviar);

        await Swal.fire({
            title: "¡Inscripción enviada con éxito!",
            icon: "success",
            confirmButtonText: "Aceptar",
            backdrop: true,
            allowOutsideClick: false,
        });

        window.location.href =
            "https://www.fesc.edu.co/portal/component/weblinks/weblink/101-google?catid=87&Itemid=640";

        console.log("Formulario guardado. ID:", response.id);

    } catch (error: any) {
        // Verificar si es un error Axios con status 409
        if (error.response?.status === 409) {
            await Swal.fire({
                title: "Documento duplicado",
                text: "Este formulario ya se ha respondido con tu número de identificación.",
                icon: "warning",
                confirmButtonText: "Aceptar",
                backdrop: true,
                allowOutsideClick: false,
            });
        } else {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "No se pudo enviar el formulario. Inténtalo de nuevo.",
                life: 5000,
            });
            console.error("Error al enviar el formulario:", error);
        }
    }
};


    useEffect(() => {
        if (visible) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        const fetchProgramas = async () => {
            try {
                const response = await formularioService.getProgramas();
                setProgramas(response);
            } catch (error) {
                console.error("Error al cargar programas:", error);
            }
        };

        fetchProgramas();

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [visible]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-200 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl backdrop-blur-sm bg-white/80 border-0 shadow-2xl rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>
                <div className="px-8 pt-8 pb-6 flex flex-col items-center">
                    <img src="/LOGOFESC.png" alt="Logo FESC" className="mx-auto mb-4 w-40 h-auto" />
                    <div className="text-center">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">FORMULARIO DE INSCRIPCIÓN FORMACIÓN CONTINUA</h1>
                        <p className="text-red-600 text-lg">PROCESO: Prestación de Servicio / Extensión y Proyección a la comunidad</p>
                    </div>
                </div>
                <div className="flex items-center justify-end px-8 py-4 bg-white/60">
                    <span className="text-sm text-gray-600 font-medium mr-2">Fecha de diligenciamiento:</span>
                    <span className="text-sm text-gray-800 font-semibold">
                        {Formulario.formd_fecha}
                    </span>
                </div>
                <div className="px-8 py-4 bg-white/60 flex items-center">
                    <label className="block text-sm font-medium text-gray-700 mr-4">
                        NOMBRE DEL PROGRAMA DE FORMACIÓN CONTINUA:
                    </label>
                    <select
                        value={Formulario.formv_nombre_prog_formacion}
                        onChange={(e) => handleInputChange('formv_nombre_prog_formacion', e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    >
                        <option value="">Seleccione un programa</option>
                        {Programa.map((programa) => (
                            <option key={programa.id} value={programa.programa}>
                                {programa.programa}
                            </option>
                        ))}
                    </select>
                </div>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="p-8">
                        <div className="space-y-8">
                            <div className="bg-white/80 rounded-xl p-6 shadow-lg">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-6 flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full mr-3 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    Información Personal
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Campos obligatorios con alerta visual si están vacíos */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                                        <input
                                            type="text"
                                            value={Formulario.formv_nombres}
                                            onChange={(e) => handleInputChange('formv_nombres', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${camposObligatorios.includes('formv_nombres') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="Nombres"
                                        />
                                        {camposObligatorios.includes('formv_nombres') && (
                                            <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                                        <input
                                            type="text"
                                            value={Formulario.formv_apellidos}
                                            onChange={(e) => handleInputChange('formv_apellidos', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${camposObligatorios.includes('formv_apellidos') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="Apellidos"
                                        />
                                        {camposObligatorios.includes('formv_apellidos') && (
                                            <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico Personal</label>
                                        <input
                                            type="email"
                                            value={Formulario.formv_correo_postulante}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.includes(',') || value.includes(' ')) {
                                                    toast.current?.show({
                                                        severity: 'warn',
                                                        summary: 'Correo inválido',
                                                        detail: 'Solo se permite una dirección de correo electrónico.',
                                                        life: 4000
                                                    });
                                                    return;
                                                }
                                                handleInputChange('formv_correo_postulante', value);
                                            }}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${camposObligatorios.includes('formv_correo_postulante') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="Correo Electrónico Personal"
                                        />
                                        {camposObligatorios.includes('formv_correo_postulante') && (
                                            <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Documento</label>
                                            <select
                                                value={Formulario.formv_tipo_identificacion}
                                                onChange={(e) => handleInputChange('formv_tipo_identificacion', e.target.value)}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${camposObligatorios.includes('formv_tipo_identificacion') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="TI">T.I</option>
                                                <option value="CC">C.C</option>
                                                <option value="CE">C.E</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                            {camposObligatorios.includes('formv_tipo_identificacion') && (
                                                <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                            )}
                                        </div>
                                        <div className="w-1/2 flex flex-col">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Número de Identificación</label>
                                            <input
                                                type="text"
                                                value={Formulario.formv_identificacion}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                    handleInputChange('formv_identificacion', value);
                                                }}
                                                maxLength={10}
                                                inputMode="numeric"
                                                pattern="\d*"
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${camposObligatorios.includes('formv_identificacion') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                                placeholder="Número de Identificación"
                                            />
                                            {camposObligatorios.includes('formv_identificacion') && (
                                                <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Expedición</label>
                                        <input
                                            type="text"
                                            value={Formulario.formv_expedicion}
                                            onChange={(e) => handleInputChange('formv_expedicion', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${camposObligatorios.includes('formv_expedicion') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="Lugar de expedición"
                                        />
                                        {camposObligatorios.includes('formv_expedicion') && (
                                            <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Dirección Residencial</label>
                                        <input
                                            type="text"
                                            value={Formulario.formv_direccion}
                                            onChange={(e) => handleInputChange('formv_direccion', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${camposObligatorios.includes('formv_direccion') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="Dirección Residencial"
                                        />
                                        {camposObligatorios.includes('formv_direccion') && (
                                            <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                        )}
                                    </div>
                                    {/* Teléfono Fijo es opcional, no aplica alerta */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Fijo <span className="text-xs text-gray-400">(Opcional)</span></label>
                                        <input
                                            type="tel"
                                            value={Formulario.formv_telefono_fijo}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                handleInputChange('formv_telefono_fijo', value);
                                            }}
                                            maxLength={10}
                                            inputMode="numeric"
                                            pattern="\d*"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            placeholder="Teléfono Fijo"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Celular</label>
                                        <input
                                            type="tel"
                                            value={Formulario.formv_celular}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                handleInputChange('formv_celular', value);
                                            }}
                                            maxLength={10}
                                            inputMode="numeric"
                                            pattern="\d*"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${camposObligatorios.includes('formv_celular') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="Teléfono Celular"
                                        />
                                        {camposObligatorios.includes('formv_celular') && (
                                            <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Información Laboral (Opcional) */}
                            <div className="bg-white/80 rounded-xl p-6 shadow-lg">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent mb-6 flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mr-3 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2M9 17a4 4 0 01-8 0v-2a4 4 0 018 0v2zm0-2a4 4 0 018 0v2a4 4 0 01-8 0v-2z" />
                                        </svg>
                                    </div>
                                    Información Laboral <span className="ml-2 text-xs text-gray-500 font-normal">(Opcional)</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Empresa que Labora <span className="text-xs text-gray-400">(Opcional)</span></label>
                                        <input
                                            type="text"
                                            value={Formulario.formv_empresa_laboral}
                                            onChange={(e) => handleInputChange('formv_empresa_laboral', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
                                            placeholder="Empresa que Labora"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Cargo que desempeña <span className="text-xs text-gray-400">(Opcional)</span></label>
                                        <input
                                            type="text"
                                            value={Formulario.formv_cargo}
                                            onChange={(e) => handleInputChange('formv_cargo', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
                                            placeholder="Cargo que desempeña"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Dirección Oficina <span className="text-xs text-gray-400">(Opcional)</span></label>
                                        <input
                                            type="text"
                                            value={Formulario.formv_direccion_oficina}
                                            onChange={(e) => handleInputChange('formv_direccion_oficina', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
                                            placeholder="Dirección Oficina"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Oficina <span className="text-xs text-gray-400">(Opcional)</span></label>
                                        <input
                                            type="tel"
                                            value={Formulario.formv_telefono_oficina}
                                            onChange={(e) => handleInputChange('formv_telefono_oficina', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
                                            placeholder="Teléfono Oficina"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico de Empresa <span className="text-xs text-gray-400">(Opcional)</span></label>
                                        <input
                                            type="email"
                                            value={Formulario.formv_correo_oficina}
                                            onChange={(e) => handleInputChange('formv_correo_oficina', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
                                            placeholder="Correo Electrónico de Empresa"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/80 rounded-xl p-6 shadow-lg">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent mb-6 flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full mr-3 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 7v-7" />
                                        </svg>
                                    </div>
                                    <span>Información Académica</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Último nivel de estudios</label>
                                        <select
                                            value={Formulario.formv_nivel_academico}
                                            onChange={(e) => handleInputChange('formv_nivel_academico', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400 ${camposObligatorios.includes('formv_nivel_academico') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="Bachiller">Bachiller</option>
                                            <option value="Tecnologo">Tecnólogo</option>
                                            <option value="Profesional">Profesional</option>
                                            <option value="Posgrado">Posgrado</option>
                                        </select>
                                        {camposObligatorios.includes('formv_nivel_academico') && (
                                            <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Institución</label>
                                        <input
                                            type="text"
                                            value={Formulario.formv_universidad}
                                            onChange={(e) => handleInputChange('formv_universidad', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400 ${camposObligatorios.includes('formv_universidad') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="Institución"
                                        />
                                        {camposObligatorios.includes('formv_universidad') && (
                                            <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del programa académico</label>
                                        <input
                                            type="text"
                                            value={Formulario.formv_nombre_prog_academico}
                                            onChange={(e) => handleInputChange('formv_nombre_prog_academico', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400 ${camposObligatorios.includes('formv_nombre_prog_academico') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="Programa académico"
                                        />
                                        {camposObligatorios.includes('formv_nombre_prog_academico') && (
                                            <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de finalización de estudios</label>
                                        <Calendar
                                            value={fechaFinalizacion}
                                            onChange={(e) => setFechaFinalizacion(e.value ?? null)}
                                            showIcon
                                            placeholder="Seleccione fecha"
                                            className="w-full"
                                            dateFormat="dd/mm/yy"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">¿Eres egresado FESC?</label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setEgresadoFESC(true)}
                                            className={`font-semibold py-2 px-6 rounded-lg shadow transition-all duration-200 focus:ring-2 focus:ring-green-300 ${
                                                egresadoFESC === true 
                                                    ? 'bg-green-600 text-white' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            Sí
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEgresadoFESC(false)}
                                            className={`font-semibold py-2 px-6 rounded-lg shadow transition-all duration-200 focus:ring-2 focus:ring-red-300 ${
                                                egresadoFESC === false 
                                                    ? 'bg-red-600 text-white' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white/80 rounded-xl p-6 shadow-lg">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent mb-6 flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-300 to-green-500 rounded-full mr-3 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.333-1.333-4-1-4 1s2.667 3 4 3 4 1 4 3-2.667 2-4 2m0-10v10" />
                                        </svg>
                                    </div>
                                    Método de Pago
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: "Consignación", value: "consignacion" },
                                        { label: "Transferencia", value: "transferencia" },
                                        { label: "Pago virtual", value: "pago_virtual" },
                                        { label: "Cheque", value: "cheque" },
                                        { label: "Tarjeta (débito o crédito)", value: "tarjeta" },
                                        { label: "Otro", value: "otro" }
                                    ].map(option => (
                                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="metodo_pago"
                                                value={option.value}
                                                checked={Formulario.formv_forma_pago === option.value}
                                                onChange={(e) => handleInputChange('formv_forma_pago', e.target.value)}
                                                className={`w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500 ${camposObligatorios.includes('formv_forma_pago') ? 'border-red-500 bg-red-50' : ''}`}
                                            />
                                            <span className="text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                    {camposObligatorios.includes('formv_forma_pago') && (
                                        <div className="col-span-2 mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
                                            <span className="font-semibold">Este campo es obligatorio</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white/80 rounded-xl p-6 shadow-lg">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-6 flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full mr-3 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    Términos y Condiciones
                                </h2>
                                <div className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        id="terminos"
                                        checked={aceptaTerminos}
                                        onChange={(e) => setAceptaTerminos(e.target.checked)}
                                        className={`w-5 h-5 border-gray-300 rounded focus:ring-blue-500 mt-1 ${camposObligatorios.includes('aceptaTerminos') ? 'border-red-500 bg-red-50' : ''}`}
                                    />
                                    <label htmlFor="terminos" className="text-gray-700 cursor-pointer">
                                        He leído y acepto los términos y condiciones de tratamiento de datos personales
                                    </label>
                                </div>
                                {camposObligatorios.includes('aceptaTerminos') && (
                                    <div className="mt-2 text-red-600 text-sm">Este campo es obligatorio</div>
                                )}
                            </div>

                            

                            <div className="flex justify-end pb-4">
                                <Button
                                    type="button"
                                    label="Información del programa"
                                    icon="pi pi-book"
                                    onClick={() => setVisible(true)}
                                    className="bg-blue-600 border-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-700 hover:border-blue-700 transition-all duration-200"
                                    style={{ background: '#2563eb', borderColor: '#2563eb' }}
                                />
                            </div>
                            
                            <Dialog
                                visible={visible}
                                style={{ width: '90vw', maxWidth: '900px', backgroundColor: '#e0f2fe' }} 
                                onHide={() => setVisible(false)}
                                maskClassName="backdrop-blur-sm"
                                draggable={false}
                                modal
                            >
                                <div className="bg-blue-100 rounded-xl p-8 shadow-inner relative">
                                    <div className="mb-4">
                                        <p className="mb-4 text-justify text-blue-900">
                                            En cumplimiento con lo establecido en la Ley 1581 de 2012 sobre Protección de Datos Personales y su decreto reglamentario 1377 de 2013, la FESC informa que garantiza la protección plena del derecho de Habeas Data a estudiantes, empleados, proveedores, usuarios y grupos de interés. Todos los datos suministrados voluntaria y libremente se encuentran incorporados en nuestras bases de datos y tienen por finalidad ser recolectados, almacenados, usados y tratados por la FESC para el correcto y natural ejercicio de sus actividades de formación, administrativas, financieras, comercial, así como el envío de boletines informativos físicos y electrónicos e información publicitaria.
                                        </p>
                                        <p className="mb-2 text-justify text-blue-900">
                                            Por lo tanto, de forma <span className="font-bold">LIBRE, PREVIA, EXPRESA, VOLUNTARIA e INFORMADA</span> Usted acepta y reconoce que:
                                        </p>
                                        <ol className="list-decimal list-inside pl-4 space-y-1 mb-4 text-blue-900">
                                            <li>Entregará información personal a la FESC.</li>
                                            <li>Esta información es y será utilizada en el desarrollo de las funciones propias de la Institución en su condición de institución de educación superior, de forma directa o a través de terceros.</li>
                                            <li>La FESC en los términos dispuestos por el Decreto 1377 (Art. 10) queda autorizada de manera expresa e inequívoca para mantener y manejar toda su información, a no ser que usted manifieste lo contrario de manera directa, expresa, inequívoca.</li>
                                        </ol>
                                        <p className="text-justify text-blue-900">
                                            En señal de aceptación consiento y autorizo que mis datos personales sean tratados conforme a lo previsto en la presente autorización.
                                        </p>
                                    </div>
                                </div>
                            </Dialog>

                            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                                {/* Apartado para subir firma, documento y comprobante de pago */}
                                <div className="bg-white/80 rounded-xl p-6 shadow-lg w-full mb-6">
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent mb-6 flex items-center">
                                        <span className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full mr-3 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12v1a4 4 0 01-8 0v-1m8 0V8a4 4 0 00-8 0v4m8 0a4 4 0 01-8 0m8 0v1a4 4 0 01-8 0v-1" />
                                            </svg>
                                        </span>
                                        Adjuntos
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Firma (imagen)</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            handleInputChange('formv_firma_base64', reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className={`w-full px-4 py-2 border rounded-lg ${camposObligatorios.includes('formv_firma_base64') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            />
                                            {camposObligatorios.includes('formv_firma_base64') && (
                                                <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Documento de identidad (imagen)</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            handleInputChange('formv_documento_base64', reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className={`w-full px-4 py-2 border rounded-lg ${camposObligatorios.includes('formv_documento_base64') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            />
                                            {camposObligatorios.includes('formv_documento_base64') && (
                                                <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Comprobante de pago (imagen)</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            handleInputChange('formv_comprobante_pago_base64', reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className={`w-full px-4 py-2 border rounded-lg ${camposObligatorios.includes('formv_comprobante_pago_base64') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            />
                                            {camposObligatorios.includes('formv_comprobante_pago_base64') && (
                                                <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full justify-between items-center">
                               <button
                                type="submit"
                                className="bg-red-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-red-700 
                                        transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-red-300"
                                disabled={!isFormValid}
                                style={{
                                opacity: isFormValid ? 1 : 0.6,
                                cursor: isFormValid ? "pointer" : "not-allowed"
                                }}
                            >
                                Enviar Inscripción
                            </button>
                                <button 
                                    type="button" 
                                    onClick={() => window.location.href = 'https://www.fesc.edu.co/portal/nuestra-academia/preinscripciones'}
                                    className="border-2 border-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:ring-4 focus:ring-gray-300"
                                    style={{ marginLeft: 'auto' }}
                                >
                                    Volver a Inicio
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;