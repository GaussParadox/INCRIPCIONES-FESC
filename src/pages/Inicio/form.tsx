import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-green/theme.css'; // Puedes cambiar de tema si deseas
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Form: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [fechaFinalizacion, setFechaFinalizacion] = useState<Date | null>(null);

    const handleNavigateHome = () => {
        console.log('Navegando al inicio...');
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Header */}
                
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">FORMULARIO DE INSCRIPCIÓN FORMACIÓN CONTINUA</h1>
                        <p className="text-blue-100 text-lg">PROCESO: Prestación de Servicio  / Extensión y Proyección a la comunidad</p>
                    </div>
                </div>
                {/* Fecha de Diligenciamiento */}
                <div className="flex items-center justify-end px-8 py-4 bg-gray-100">
                    <span className="text-sm text-gray-600 font-medium mr-2">Fecha de diligenciamiento:</span>
                    <span className="text-sm text-gray-800 font-semibold">
                        {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
                {/* Nombre del Programa de Formación Continua */}
                <div className="px-8 py-4 bg-gray-100 flex items-center">
                    <label className="block text-sm font-medium text-gray-700 mr-4">
                        NOMBRE DEL PROGRAMA DE FORMACIÓN CONTINUA:
                    </label>
                    <input
                        type="text"
                        className="w-full max-w-md px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="Ingrese el nombre del programa"
                    />
                </div>
                {/* Form Content */}
                <div className="p-8">
                    <div className="space-y-8">
                        {/* Información Personal */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-6 h-6 bg-gray-500 rounded-full mr-3"></div>
                                Información Personal
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Nombres" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Apellidos" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico Personal</label>
                                    <input 
                                        type="email" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Correo@gmail.com" 
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Documento</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400">
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                            placeholder="Número de Identificación" 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Dirección Residencial</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Dirección Residencial" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Celular</label>
                                    <input 
                                        type="tel" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grey-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Teléfono Celular" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Información Laboral */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-6 h-6 bg-yellow-500 rounded-full mr-3"></div>
                                Información Laboral
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Empresa que Labora</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Empresa que Labora" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cargo que desempeña</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Cargo que desempeña" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Dirección Oficina</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Dirección Oficina" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Oficina</label>
                                    <input 
                                        type="tel" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Teléfono Oficina" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico de Empresa</label>
                                    <input 
                                        type="email" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Correo Electrónico de Empresa" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Información Académica */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <span className="w-6 h-6 bg-green-500 rounded-full mr-3 inline-block"></span>
                                <span>Información Académica</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Último nivel de estudios</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400">
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
                                        placeholder="Universidad" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del programa académico</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
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
                                    <Button
                                        label="Sí"
                                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow hover:from-green-600 hover:to-green-800"
                                    />
                                    <Button
                                        label="No"
                                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow hover:from-red-600 hover:to-red-800"
                                    />
                                </div>
                            </div>
                            <Button label="Volver al inicio" onClick={handleNavigateHome} className="mt-4" />
                        </div>
                        
                        {/* Metodo de pago */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-6 h-6 bg-purple-500 rounded-full mr-3"></div>
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
                                            className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                                        />
                                        <span className="text-gray-700">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        

                        {/* PrimeReact Button y Dialog */}
                        <div className="flex justify-end pb-4">
                            <Button label="Información del programa" icon="pi pi-book" onClick={() => setVisible(true)} />
                        </div>
                        <Dialog
                            visible={visible}
                            style={{ width: '80vw', maxWidth: '900px' }}
                            onHide={() => setVisible(false)}
                            maskClassName="backdrop-blur-sm"
                            draggable={false}
                            modal
                        >
                            <div className="bg-blue-50 rounded-xl p-8 shadow-inner relative">
                                <button
                                    type="button"
                                    onClick={() => setVisible(false)}
                                    className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 text-xl focus:outline-none"
                                    aria-label="Cerrar"
                                >
                                    <i className="pi pi-times"></i>
                                </button>
                                <div className="mb-4">
                                    <p className="mb-4 text-justify">
                                        En cumplimiento con lo establecido en la Ley 1581 de 2012 sobre Protección de Datos Personales y su decreto reglamentario 1377 de 2013 la FESC informa que, garantiza la protección plena del derecho de Habeas Data a estudiantes, empleados, proveedores, usuarios y grupos de interés. Todos los datos suministrados voluntaria y libremente se encuentran incorporados en nuestras bases de datos y tienen por finalidad ser recolectados, almacenados, usados y tratados por la FESC para el correcto y natural ejercicio de sus actividades de formación, administrativas, financieras, comercial, así como el envío de boletines informativos físicos y electrónicos e información publicitaria, permitiendo a las dependencias (académicas y administrativas) recolectar, recaudar, almacenar, usar, circular, suprimir, procesar, compilar, intercambiar, dar tratamiento, actualizar, y disponer de los datos que han sido suministrados y que se han incorporado en distintas bases o bancos de datos, o en repositorios electrónicos de todo tipo con que cuenta la Institución. Se recuerda a los usuarios que podrán ejercer los derechos en conocer, actualizar, rectificar y suprimir sus datos personales que se encuentran en nuestros archivos, en cualquier momento y sin ningún costo, previa acreditación de su identidad. Para lo anterior pueden contactarse por escrito a la dirección Av. 4 #15-14 barrio La Playa en Cúcuta, o en la sede Ocaña en la dirección KDX 194-785 barrio Llano de los Alcaldes, vía universitaria; a través de correo electrónico habeasdata@fesc.edu.co, o al teléfono (037) 582 9292 Ext: 118. Para conocer más sobre nuestra Política de Tratamiento Protección de Datos puede consultar en <a href="http://www.fesc.edu.co/portal/index.php/informacion-institucional/normatividad/normatividad-interna.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">este enlace</a>.
                                    </p>
                                    <p className="mb-2 text-justify">
                                        Por lo tanto, de forma <span className="font-bold">LIBRE, PREVIA, EXPRESA, VOLUNTARIA e INFORMADA</span> Usted acepta y reconoce que:
                                    </p>
                                    <ol className="list-decimal list-inside pl-4 space-y-1 mb-4">
                                        <li>Entregará información personal a la FESC.</li>
                                        <li>Esta información es y será utilizada en el desarrollo de las funciones propias de la Institución en su condición de institución de educación superior, de forma directa o a través de terceros.</li>
                                        <li>La FESC en los términos dispuestos por el Decreto 1377 (Art. 10) queda autorizada de manera expresa e inequívoca para mantener y manejar toda su información, a no ser que usted manifieste lo contrario de manera directa, expresa, inequívoca.</li>
                                    </ol>
                                    <p className="text-justify">
                                        En señal de aceptación consiento y autorizo que mis datos personales sean tratados conforme a lo previsto en la presente autorización.
                                    </p>
                                </div>
                            </div>
                        </Dialog>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                            <button 
                                type="submit" 
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300"
                            >
                                Submit Registration
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNavigateHome}
                                className="border-2 border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:ring-4 focus:ring-gray-300"
                            >
                                Volver a Inicio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;