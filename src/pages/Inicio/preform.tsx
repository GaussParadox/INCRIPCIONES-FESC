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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-200 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-red-500/10 to-red-400/10"></div>

      <Card className="w-full max-w-lg backdrop-blur-sm bg-white/80 border-0 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>

        <CardHeader className="text-center space-y-4 pb-8 pt-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
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
</div>


            <Button
            onClick={async () => {
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
