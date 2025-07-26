import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { ChangeEvent } from "react"
import type { PreForm } from "@/models/Formulario"
import { useEffect } from "react";
import type { Fuente } from "@/models/Formulario";
import { formularioService } from "@/services/formularioService";
import Swal from 'sweetalert2';


export default function Preform() {
  const [camposObligatorios, setCamposObligatorios] = useState<string[]>([]);
  const [formData, setFormData] = useState<PreForm>({
    preformv_nombres: '',
    preformv_apellidos: '',
    preformv_correo: '',
    preformv_fuentes: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (field: keyof PreForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }


const [fuentes, setFuentes] = useState<Fuente[]>([]);

useEffect(() => {
  const fetchFuentes = async () => {
    try {
      const data = await formularioService.getFuentes();
      setFuentes(data);
    } catch (error) {
      console.error("Error al obtener fuentes:", error);
    }
  };
  fetchFuentes();
}, []);


  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Fondo base con gradiente más claro */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-red-50 to-white"></div>

      {/* Capa de patrones geométricos más suaves */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-200/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-red-200/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Efectos de luz más claros */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-100/30 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-red-200/20 to-transparent"></div>
      </div>

      {/* Partículas flotantes más tenues */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-red-100/60 rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '0s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-red-50/80 rounded-full animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-200/50 rounded-full animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/6 w-1 h-1 bg-red-100/70 rounded-full animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1.5s'}}></div>
      </div>

      {/* Ondas decorativas más blancas */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <path d="M0,300 Q250,200 500,300 T1000,300 L1000,0 L0,0 Z" fill="url(#gradient1)" opacity="0.07"/>
          <path d="M0,400 Q250,300 500,400 T1000,400 L1000,0 L0,0 Z" fill="url(#gradient2)" opacity="0.07"/>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#fff" stopOpacity="0.05"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#fff" stopOpacity="0.03"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Grid pattern sutil más blanco */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <Card className="w-full max-w-lg backdrop-blur-sm bg-white/90 border-0 shadow-2xl relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>

        <CardHeader className="text-center space-y-4 pb-8 pt-8">
          <div className="flex flex-col items-center justify-center mb-4">
            <img src="/LOGOFESC.png" alt="Logo FESC" className="mx-auto mb-2 w-32 h-auto" />
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
            Pre-registro del Curso
          </CardTitle>
          <CardDescription className="text-red-600 text-lg leading-relaxed">
            ¡Bienvenido! Completa el siguiente formulario para pre-registrarte en el curso.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Nombre
                </Label>
                <Input
                  id="firstName"
                  value={formData.preformv_nombres}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value
                    if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/.test(value)) {
                      handleInputChange('preformv_nombres', value)
                    }
                  }}
                  placeholder="Ingresa tu nombre"
                  className="border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg transition-all duration-200 hover:border-red-300"
                  required
                />
                {camposObligatorios && camposObligatorios.includes('preformv_nombres') && (
                  <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Apellido
                </Label>
                <Input
                  id="lastName"
                  value={formData.preformv_apellidos}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value
                    if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/.test(value)) {
                      handleInputChange('preformv_apellidos', value)
                    }
                  }}
                  placeholder="Ingresa tu apellido"
                  className="border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg transition-all duration-200 hover:border-red-300"
                  required
                />
                {camposObligatorios && camposObligatorios.includes('preformv_apellidos') && (
                  <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.preformv_correo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('preformv_correo', e.target.value)}
                placeholder="ejemplo@correo.com"
                className="border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg transition-all duration-200 hover:border-red-300"
                required
              />
              {camposObligatorios && camposObligatorios.includes('preformv_correo') && (
                <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
              )}
            </div>

            <div className="space-y-3">
  <Label htmlFor="source" className="text-sm font-semibold text-gray-700 flex items-center">
    <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    ¿Cómo te enteraste del curso?
  </Label>
  <Select onValueChange={(value: string) => handleInputChange('preformv_fuentes', value)}>
    <SelectTrigger className="border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg transition-all duration-200 hover:border-red-300">
      <SelectValue placeholder="Selecciona una opción" />
    </SelectTrigger>
    <SelectContent>
      {fuentes.map((fuente) => (
        <SelectItem key={fuente.id} value={fuente.fuente}>
          {fuente.fuente}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  {camposObligatorios && camposObligatorios.includes('preformv_fuentes') && (
    <div className="text-red-600 text-sm mt-1">Este campo es obligatorio</div>
  )}
</div>


            <Button
            onClick={async () => {
                const vacios: string[] = [];
                if (!formData.preformv_nombres) vacios.push('preformv_nombres');
                if (!formData.preformv_apellidos) vacios.push('preformv_apellidos');
                if (!formData.preformv_correo) vacios.push('preformv_correo');
                if (!formData.preformv_fuentes) vacios.push('preformv_fuentes');
                setCamposObligatorios(vacios);
                if (vacios.length > 0) return;
                setLoading(true);
                try {
                await formularioService.postGuardarPreinscripcion(formData);
                Swal.fire({
                    title: "¡Pre-registro exitoso!",
                    text: "Tu pre-registro ha sido guardado correctamente.",
                    icon: "success",
                });
                navigate('/form');
                } catch (error) {
                console.error("Error al enviar preformulario:", error);
                } finally {
                setLoading(false);
                }
            }}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {loading ? 'Redirigiendo...' : 'Pre-registrarme Ahora'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}