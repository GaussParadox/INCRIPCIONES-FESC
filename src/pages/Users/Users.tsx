import { useEffect, useState } from "react";
import type { ProgramaResumen } from "@/models/Formulario";
import { formularioService } from "@/services/formularioService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, UserCog } from "lucide-react";
import { CreateUserDialog } from "@/components/create-user-dialog";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function UsersPage() {
  const [formularios, setFormularios] = useState<ProgramaResumen[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await formularioService.getFormulariosResumen();
        setFormularios(data);
      } catch (error) {
        console.error("Error al cargar formularios:", error);
      }
    };

    fetchData();
  }, []);

  const filteredFormularios = formularios.filter((form) => {
    const query = searchTerm.toLowerCase();
    return (
    form.formv_nombres?.toLowerCase().includes(query) ||
    form.formv_apellidos?.toLowerCase().includes(query) ||
    form.formv_correo_postulante?.toLowerCase().includes(query) ||
    form.formv_identificacion?.toLowerCase().includes(query) ||
    form.formv_celular?.toLowerCase().includes(query) ||
    form.formv_nombre_prog_formacion?.toLowerCase().includes(query) ||
    form.formv_forma_pago?.toLowerCase().includes(query) ||
    form.fecha_formateada?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-72">
        <Header />

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Formularios Registrados
              </h1>
              <p className="text-muted-foreground">
                Consulta rápida de inscripciones
              </p>
            </div>
            <CreateUserDialog />
          </div>

          <Card>
            <CardHeader className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 w-full max-w-sm">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, correo..."
                    className="h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="outline" size="sm">
                    Exportar
                  </Button>
                  <Button variant="outline" size="sm">
                    Filtrar
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-auto">
              <div className="w-full min-w-[900px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Programa</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Apellidos</TableHead>
                      <TableHead>Identificación</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Celular</TableHead>
                      <TableHead>Forma de Pago</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredFormularios.map((form) => (
                      <TableRow key={form.formn_id}>
                        <TableCell>{form.formn_id}</TableCell>
                        <TableCell>{form.formv_nombre_prog_formacion}</TableCell>
                        <TableCell>{form.formv_nombres}</TableCell>
                        <TableCell>{form.formv_apellidos}</TableCell>
                        <TableCell>{form.formv_identificacion}</TableCell>
                        <TableCell>{form.formv_correo_postulante}</TableCell>
                        <TableCell>{form.formv_celular}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              form.formv_forma_pago === "consignacion"
                                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                                : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                            }`}
                          >
                            {form.formv_forma_pago}
                          </div>
                        </TableCell>
                        <TableCell>{form.fecha_formateada}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" asChild>
                            <a href={`/formularios/${form.formn_id}`}>
                              <UserCog className="h-4 w-4" />
                              <span className="sr-only">Ver formulario</span>
                            </a>
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
