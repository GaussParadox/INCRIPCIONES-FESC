import { useEffect, useState } from "react";
import { formularioService } from "@/services/formularioService";
import type { Programa } from "@/models/Formulario";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Trash2 } from "lucide-react";
import { CrearCursos} from "@/components/create-user-dialog";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function ProgramasPage() {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const data = await formularioService.getProgramas();
        setProgramas(data);
      } catch (error) {
        console.error("Error al cargar programas:", error);
      }
    };

    fetchProgramas();
  }, []);

  const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      await formularioService.deletePrograma(id);
      setProgramas((prev) => prev.filter((p) => p.id !== id));
      await Swal.fire({
        title: "¡Eliminado!",
        text: "El programa ha sido eliminado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al eliminar:", error);
      await Swal.fire({
        title: "Error",
        text: "Ocurrió un error al eliminar el programa.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }
};


  const filteredProgramas = programas.filter((p) =>
    p.programa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-72">
        <Header />
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Programas Técnicos y Cursos
              </h1>
              <p className="text-muted-foreground">
                Listado de todos los programas registrados
              </p>
            </div>
            <CrearCursos />
          </div>

          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2 w-full max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre del programa..."
                  className="h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-auto">
              <div className="w-full min-w-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center align-middle">ID</TableHead>
                      <TableHead className="text-center align-middle">Nombre del Programa</TableHead>
                      <TableHead className="text-center align-middle">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProgramas.map((prog) => (
                      <TableRow key={prog.id}>
                        <TableCell className="text-center align-middle">{prog.id}</TableCell>
                        <TableCell className="text-center align-middle">{prog.programa}</TableCell>
                        <TableCell className="text-center align-middle">
                            <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(prog.id)}
                            >
                            <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
