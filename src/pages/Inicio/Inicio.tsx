import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import Dashboard from "./Dashboard";

const Inicio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-72 ">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default Inicio;
