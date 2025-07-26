"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { UserPlus } from "lucide-react"
import { formularioService } from "@/services/formularioService"
import Swal from "sweetalert2"

export function CrearCursos() {
  const [open, setOpen] = useState(false)
  const [programa, setPrograma] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas crear este curso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, crear curso",
      cancelButtonText: "Cancelar"
    })

    if (result.isConfirmed) {
      try {
        const response = await formularioService.postCrearPrograma(programa)
        Swal.fire({
          title: "¡Curso creado!",
          text: response.message,
          icon: "success"
        })
        setOpen(false)
      } catch (error) {
        console.error("Error al crear el curso:", error)
        Swal.fire({
          title: "Error",
          text: "No se pudo crear el curso.",
          icon: "error"
        })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Crear Curso
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Curso</DialogTitle>
          <DialogDescription>
            Escribe el nombre del nuevo curso de formación.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="programa">Nombre del Curso</Label>
              <Input
                id="programa"
                placeholder="Ej. Técnico en Contabilidad"
                value={programa}
                onChange={(e) => setPrograma(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Curso</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
