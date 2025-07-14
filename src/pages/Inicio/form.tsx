import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface FormData {
    formv_nombre_prog_formacion: string;
    formv_nombres: string;
    formv_apellidos: string;
    formd_fecha: string;
    formv_tipo_identificacion: string;
    formv_identificacion: string;
    formv_expedicion: string;
    formv_direccion: string;
    formv_telefono_fijo: string;
    formv_correo_postulante: string;
    formv_celular: string;
    formv_empresa_laboral: string;
    formv_cargo: string;
    formv_direccion_oficina: string;
    formv_telefono_oficina: string;
    formv_correo_oficina: string;
    formv_nivel_academico: string;
    formv_universidad: string;
    formv_nombre_prog_academico: string;
    formv_year: number;
    formv_egresado: boolean;
    formv_forma_pago: string;
}

const Form: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [fechaFinalizacion, setFechaFinalizacion] = useState<Date | null>(null);
    const [egresadoFESC, setEgresadoFESC] = useState<boolean | null>(null);
    const [aceptaTerminos, setAceptaTerminos] = useState<boolean>(false);
    
    const [formData, setFormData] = useState<FormData>({
        formd_fecha: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
        formv_nombre_prog_formacion: '',
        formv_nombres: '',
        formv_apellidos: '',
        formv_correo_postulante: '',
        formv_tipo_identificacion: '',
        formv_identificacion: '',
        formv_expedicion: '',
        formv_direccion: '',
        formv_telefono_fijo: '',
        formv_celular: '',
        formv_empresa_laboral: '',
        formv_cargo: '',
        formv_direccion_oficina: '',
        formv_telefono_oficina: '',
        formv_correo_oficina: '',
        formv_nivel_academico: '',
        formv_universidad: '',
        formv_nombre_prog_academico: '',
        formv_year: 0,
        formv_egresado: false,
        formv_forma_pago: ''
    });

    const handleInputChange = (field: keyof FormData, value: string | boolean | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNavigateHome = () => {
        console.log('Navegando al inicio...');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generar JSON
        const jsonResult = JSON.stringify(formData, null, 2);
        console.log('Datos del formulario en JSON:', jsonResult);


    };

    useEffect(() => {
        if (visible) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [visible]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-indigo-100 flex items-center justify-center p-4 relative">

            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">FORMULARIO DE INSCRIPCIÓN FORMACIÓN CONTINUA</h1>
                        <p className="text-blue-100 text-lg">PROCESO: Prestación de Servicio / Extensión y Proyección a la comunidad</p>
                    </div>
                </div>

                {/* Fecha de Diligenciamiento */}
                <div className="flex items-center justify-end px-8 py-4 bg-gray-100">
                    <span className="text-sm text-gray-600 font-medium mr-2">Fecha de diligenciamiento:</span>
                    <span className="text-sm text-gray-800 font-semibold">
                        {formData.formd_fecha}
                    </span>
                </div>

                {/* Nombre del Programa de Formación Continua */}
                <div className="px-8 py-4 bg-gray-100 flex items-center">
                    <label className="block text-sm font-medium text-gray-700 mr-4">
                        NOMBRE DEL PROGRAMA DE FORMACIÓN CONTINUA:
                    </label>
                    <input
                        type="text"
                        value={formData.formv_nombre_prog_formacion}
                        onChange={(e) => handleInputChange('formv_nombre_prog_formacion', e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="Ingrese el nombre del programa"
                    />
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit}>
                    <div className="p-8">
                        <div className="space-y-8">
                            {/* Información Personal */}
                            <div className="bg-red-50 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-6 h-6 bg-black rounded-full mr-3"></div>
                                    Información Personal
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                                        <input
                                            type="text"
                                            value={formData.formv_nombres}
                                            onChange={(e) => handleInputChange('formv_nombres', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            placeholder="Nombres"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                                        <input
                                            type="text"
                                            value={formData.formv_apellidos}
                                            onChange={(e) => handleInputChange('formv_apellidos', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            placeholder="Apellidos"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico Personal</label>
                                        <input
                                            type="email"
                                            value={formData.formv_correo_postulante}
                                            onChange={(e) => handleInputChange('formv_correo_postulante', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            placeholder="Correo@gmail.com"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Documento</label>
                                            <select
                                                value={formData.formv_tipo_identificacion}
                                                onChange={(e) => handleInputChange('formv_tipo_identificacion', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="TI">T.I</option>
                                                <option value="CC">C.C</option>
                                                <option value="CE">C.E</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                        <div className="w-1/2 flex flex-col">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Número de Identificación</label>
                                            <input
                                                type="text"
                                                value={formData.formv_identificacion}
                                                onChange={(e) => handleInputChange('formv_identificacion', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                                placeholder="Número de Identificación"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Expedición</label>
                                        <input
                                            type="text"
                                            value={formData.formv_expedicion}
                                            onChange={(e) => handleInputChange('formv_expedicion', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            placeholder="Lugar de expedición"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Dirección Residencial</label>
                                        <input
                                            type="text"
                                            value={formData.formv_direccion}
                                            onChange={(e) => handleInputChange('formv_direccion', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            placeholder="Dirección Residencial"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Fijo</label>
                                        <input
                                            type="tel"
                                            value={formData.formv_telefono_fijo}
                                            onChange={(e) => handleInputChange('formv_telefono_fijo', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            placeholder="Teléfono Fijo"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Celular</label>
                                        <input
                                            type="tel"
                                            value={formData.formv_celular}
                                            onChange={(e) => handleInputChange('formv_celular', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            placeholder="Teléfono Celular"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Información Laboral */}
                            <div className="bg-red-50 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-6 h-6 bg-yellow-500 rounded-full mr-3"></div>
                                    Información Laboral
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Empresa que Labora</label>
                                        <input
                                            type="text"
                                            value={formData.formv_empresa_laboral}
                                            onChange={(e) => handleInputChange('formv_empresa_laboral', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
                                            placeholder="Empresa que Labora"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Cargo que desempeña</label>
                                        <input
                                            type="text"
                                            value={formData.formv_cargo}
                                            onChange={(e) => handleInputChange('formv_cargo', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
                                            placeholder="Cargo que desempeña"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Dirección Oficina</label>
                                        <input
                                            type="text"
                                            value={formData.formv_direccion_oficina}
                                            onChange={(e) => handleInputChange('formv_direccion_oficina', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
                                            placeholder="Dirección Oficina"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Oficina</label>
                                        <input
                                            type="tel"
                                            value={formData.formv_telefono_oficina}
                                            onChange={(e) => handleInputChange('formv_telefono_oficina', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
                                            placeholder="Teléfono Oficina"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico de Empresa</label>
                                        <input
                                            type="email"
                                            value={formData.formv_correo_oficina}
                                            onChange={(e) => handleInputChange('formv_correo_oficina', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
                                            placeholder="Correo Electrónico de Empresa"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Información Académica */}
                            <div className="bg-red-50 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <span className="w-6 h-6 bg-green-500 rounded-full mr-3 inline-block"></span>
                                    <span>Información Académica</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Último nivel de estudios</label>
                                        <select
                                            value={formData.formv_nivel_academico}
                                            onChange={(e) => handleInputChange('formv_nivel_academico', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400"
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="Bachiller">Bachiller</option>
                                            <option value="Tecnologo">Tecnólogo</option>
                                            <option value="Profesional">Profesional</option>
                                            <option value="Posgrado">Posgrado</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Universidad</label>
                                        <input
                                            type="text"
                                            value={formData.formv_universidad}
                                            onChange={(e) => handleInputChange('formv_universidad', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400"
                                            placeholder="Universidad"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del programa académico</label>
                                        <input
                                            type="text"
                                            value={formData.formv_nombre_prog_academico}
                                            onChange={(e) => handleInputChange('formv_nombre_prog_academico', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400"
                                            placeholder="Programa académico"
                                        />
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
                            
                            {/* Método de pago */}
                            <div className="bg-red-50 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-6 h-6 bg-green-300 rounded-full mr-3"></div>
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
                                                checked={formData.formv_forma_pago === option.value}
                                                onChange={(e) => handleInputChange('formv_forma_pago', e.target.value)}
                                                className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                                            />
                                            <span className="text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Términos y Condiciones */}
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full mr-3"></div>
                                    Términos y Condiciones
                                </h2>
                                <div className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        id="terminos"
                                        checked={aceptaTerminos}
                                        onChange={(e) => setAceptaTerminos(e.target.checked)}
                                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                                    />
                                    <label htmlFor="terminos" className="text-gray-700 cursor-pointer">
                                        He leído y acepto los términos y condiciones de tratamiento de datos personales
                                    </label>
                                </div>
                            </div>

                            {/* PrimeReact Button y Dialog */}
                            <div className="flex justify-end pb-4">
                                <Button
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

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                                <button 
                                    type="submit" 
                                    className="bg-red-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-red-300"
                                >
                                    Enviar Inscripción
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleNavigateHome}
                                    className="border-2 border-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:ring-4 focus:ring-gray-300"
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