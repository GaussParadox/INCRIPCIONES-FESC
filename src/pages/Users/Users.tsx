import { useEffect, useState } from "react";
import type { ProgramaResumen } from "@/models/Formulario";
import { formularioService } from "@/services/formularioService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText , FileSpreadsheet } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { PropagateLoader } from "react-spinners";

export default function UsersPage() {
  const [formularios, setFormularios] = useState<ProgramaResumen[]>([]);
  const [programas, setProgramas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrograma, setSelectedPrograma] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await formularioService.getFormulariosResumen();
        setFormularios(data);
        const programasUnicos = [...new Set(data.map(f => f.formv_nombre_prog_formacion))];
        setProgramas(programasUnicos);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredFormularios = formularios.filter((f) => {
    const q = searchTerm.toLowerCase();
    const coincideBusqueda =
      f.formv_nombres?.toLowerCase().includes(q) ||
      f.formv_apellidos?.toLowerCase().includes(q) ||
      f.formv_correo_postulante?.toLowerCase().includes(q) ||
      f.formv_identificacion?.toLowerCase().includes(q) ||
      f.formv_celular?.toLowerCase().includes(q) ||
      f.formv_nombre_prog_formacion?.toLowerCase().includes(q) ||
      f.formv_forma_pago?.toLowerCase().includes(q) ||
      f.fecha_formateada?.toLowerCase().includes(q);

    const coincidePrograma =
      selectedPrograma === "" || f.formv_nombre_prog_formacion === selectedPrograma;

    return coincideBusqueda && coincidePrograma;
  });

  const totalPages = Math.ceil(filteredFormularios.length / itemsPerPage);
  const paginatedFormularios = filteredFormularios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-72">
        <Header />

        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Formularios Registrados</h1>
              <p className="text-muted-foreground">Consulta rápida de inscripciones</p>
            </div>
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

                <select
                  className="h-9 border border-gray-300 rounded px-2 text-sm"
                  value={selectedPrograma}
                  onChange={(e) => setSelectedPrograma(e.target.value)}
                >
                  <option value="">Filtrar por curso</option>
                  {programas.map((prog, i) => (
                    <option key={i} value={prog}>
                      {prog}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    onClick={formularioService.descargarExcel}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Exportar Excel
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-auto min-h-[200px]">
              {loading ? (
                <div className="flex justify-center items-center h-[200px]">
                  <PropagateLoader color="#e10a0a" />
                </div>
              ) : (
                <>
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
                        {paginatedFormularios.map((form) => (
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
                                    : form.formv_forma_pago === "transferencia"
                                    ? "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                                    : form.formv_forma_pago === "pago_virtual"
                                    ? "bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300"
                                    : form.formv_forma_pago === "cheque"
                                    ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                                    : form.formv_forma_pago === "tarjeta"
                                    ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                                    : "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300"
                                }`}
                              >
                                {form.formv_forma_pago}
                              </div>
                            </TableCell>
                            <TableCell>{form.fecha_formateada}</TableCell>
                            <TableCell className="text-right">
                            <Button
                            variant="destructive" // Botón rojo
                            size="icon"
                            onClick={() => formularioService.descargarPDF(form.formn_id)}
                            >
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Descargar PDF</span>
                          </Button>
                          </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center py-4">
                      <div className="flex items-center gap-4">
                        <Button
                          className="bg-[#e10a0a] hover:bg-[#c10a0a] text-white"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          Anterior
                        </Button>
                        <span className="text-sm font-medium">
                          Página {currentPage} de {totalPages}
                        </span>
                        <Button
                          className="bg-[#e10a0a] hover:bg-[#c10a0a] text-white"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Siguiente
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
