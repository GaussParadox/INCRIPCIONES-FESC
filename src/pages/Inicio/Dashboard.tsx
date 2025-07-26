import { DashboardChart } from "@/components/dashboard-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import {  CheckLineIcon, ComputerIcon, NotebookPen, UserPlusIcon, UsersIcon, UserXIcon, WalletIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formularioService } from "@/services/formularioService";
import type { TotalInscritos, ConteoPorPrograma, } from "@/models/Formulario";
import { SyncLoader, PropagateLoader } from "react-spinners";
import type { FuenteMasInscritos } from "@/models/Formulario";


const Dashboard = () => {
  const navigate = useNavigate();
  const [loadingInscritos, setLoadingInscritos] = useState(true);
  const [loadingProgramas, setLoadingProgramas] = useState(true);
  const [loadingConteoPorPrograma, setLoadingConteoPorPrograma] = useState(true);
  const [loadingProgramaMasInscritos, setLoadingProgramaMasInscritos] = useState(true);
  const [loadingFuenteMasInscritos, setLoadingFuenteMasInscritos] = useState(true);
  const [fuenteMasInscritos, setFuenteMasInscritos] = useState<FuenteMasInscritos | null>(null);
  const [totalInscritos, setTotalInscritos] = useState<number>(0);
  const [totalProgramas, setTotalProgramas] = useState<number>(0);
  const [conteoPorPrograma, setConteoPorPrograma] = useState<ConteoPorPrograma[]>([]);
  const [programaMasInscritos, setProgramaMasInscritos] = useState<{ programa: string; total_inscritos: number } | null>(null);



useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const totalData: TotalInscritos = await formularioService.getTotalInscritos();
      setTotalInscritos(totalData.total);
      setLoadingInscritos(false);

      const conteoData = await formularioService.getConteoPorPrograma();
      const parsed = conteoData.map(item => ({
        programa: item.programa,
        total: parseInt(item.total as any, 10)
      }));
      setConteoPorPrograma(parsed);
      setLoadingConteoPorPrograma(false); 

      const totalProgramasData = await formularioService.getTotalProgramas();
      setTotalProgramas(totalProgramasData.total);
      setLoadingProgramas(false);

      const programaMasInscritosData = await formularioService.getProgramaConMasInscritos();
      setProgramaMasInscritos(programaMasInscritosData);
      setLoadingProgramaMasInscritos(false);

      const fuenteMasInscritosData = await formularioService.getFuenteConMasInscritos();
      setFuenteMasInscritos(fuenteMasInscritosData);
      setLoadingFuenteMasInscritos(false);

    } catch (error) {
      console.error("Error al obtener datos del dashboard:", error);
      setLoadingInscritos(false);
      setLoadingProgramas(false);
      setLoadingProgramaMasInscritos(false);
      setLoadingConteoPorPrograma(false); 
    }
  };

  fetchDashboardData();
}, []);


  return (
    <div className="flex flex-col p-4 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Resumen de inscripciones y cursos disponibles
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 shadow"
        onClick={() => navigate("/form")}
          >
        Ir al Formulario
          </button>
          <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 shadow"
        onClick={() => navigate("/preform")}
          >
        Ir al pre Formulario
          </button>
        </div>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
  

        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
           <Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total de Inscritos</CardTitle>
    <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    {loadingInscritos ? (
      <SyncLoader color="#e10a0a" size={8} />
    ) : (
      <>
        <div className="text-2xl font-bold">{totalInscritos}</div>
        <p className="text-xs text-muted-foreground">Actualizado en tiempo real</p>
      </>
    )}
  </CardContent>
</Card>

<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total de Cursos y Diplomados</CardTitle>
    <ComputerIcon className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    {loadingProgramas ? (
      <SyncLoader color="#e10a0a" size={8} />
    ) : (
      <>
        <div className="text-2xl font-bold">{totalProgramas}</div>
        <p className="text-xs text-muted-foreground">Cursos y Diplomados disponibles actualmente</p>
      </>
    )}
  </CardContent>
</Card>

<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Programa con más inscritos</CardTitle>
    <NotebookPen className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    {loadingProgramaMasInscritos ? (
      <SyncLoader color="#e10a0a" size={8} />
    ) : (
      <>
        <div className="text-base font-bold">
          {programaMasInscritos ? programaMasInscritos.programa : "No disponible"}
        </div>
        <p className="text-xs text-muted-foreground">
          Total de inscritos: {programaMasInscritos?.total_inscritos ?? "--"}
        </p>
      </>
    )}
  </CardContent>
</Card>



           <Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Mejor fuente de publicidad</CardTitle>
    <CheckLineIcon className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    {loadingFuenteMasInscritos ? (
      <SyncLoader color="#e10a0a" size={8} />
    ) : (
      <>
        <div className="text-base font-bold">
          {fuenteMasInscritos ? fuenteMasInscritos.fuente : "No disponible"}
        </div>
        <p className="text-xs text-muted-foreground">
          Total de inscritos: {fuenteMasInscritos?.total_inscritos ?? "--"}
        </p>
      </>
    )}
  </CardContent>
</Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Users This Week
                </CardTitle>
                <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Transactions This Week
                </CardTitle>
                <WalletIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R 87,651</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Non-Users</CardTitle>
                <UserXIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">
                  -4% from last week
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Users This Month
                </CardTitle>
                <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">642</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Transactions This Month
                </CardTitle>
                <WalletIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R 324,845</div>
                <p className="text-xs text-muted-foreground">
                  +22% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Non-Users</CardTitle>
                <UserXIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">
                  -4% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-10">
        <CardHeader>
          <CardTitle>Total inscritos por curso</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="pl-2 flex justify-center items-center min-h-[200px]">
          {loadingConteoPorPrograma ? (
            <PropagateLoader color="#e10a0a" />
          ) : (
            <DashboardChart data={conteoPorPrograma} />
          )}
        </CardContent>
      </Card>


      </div>
    </div>
  );
};

export default Dashboard;
