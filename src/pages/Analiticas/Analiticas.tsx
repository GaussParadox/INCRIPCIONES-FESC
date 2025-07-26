import { useEffect, useState } from "react";
import { formularioService } from "@/services/formularioService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { DashboardChart } from "@/components/dashboard-chart";
import type { ConteoPorfuente } from "@/models/Formulario";
import { PropagateLoader } from "react-spinners";

export default function AnaliticasPorFuente() {
  const [loadingConteoPorFuente, setLoadingConteoPorFuente] = useState(true);
  const [conteoPorFuente, setConteoPorFuente] = useState<ConteoPorfuente[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const conteoData = await formularioService.getConteoPorFuente();
        const parsed = conteoData.map(item => ({
          fuente: item.fuente,
          total: parseInt(item.total as any, 10),
        }));
        setConteoPorFuente(parsed);
        setLoadingConteoPorFuente(false);
      } catch (error) {
        console.error("Error al obtener conteo por fuente:", error);
        setLoadingConteoPorFuente(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-72">
        <Header />
        <div className="flex flex-col gap-4 p-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <Card className="lg:col-span-10">
              <CardHeader>
                <CardTitle>Total inscritos por fuente</CardTitle>
              </CardHeader>
              <CardContent className="pl-2 flex justify-center items-center min-h-[200px]">
                {loadingConteoPorFuente ? (
                  <PropagateLoader color="#e10a0a" />
                ) : (
                  <DashboardChart
                    data={conteoPorFuente.map(item => ({
                      programa: item.fuente,
                      total: item.total,
                    }))}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
