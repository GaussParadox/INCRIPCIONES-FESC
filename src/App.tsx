
import { SidebarProvider } from "./components/sidebar-provider";
import Router from "./Routing/Router";

function App() {

  return (
    <SidebarProvider>
      <Router/>
    </SidebarProvider>
  );
}

export default App;
