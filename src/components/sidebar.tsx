import { useLocation, useNavigate } from "react-router-dom"
import { useSidebar } from "./sidebar-provider"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, BarChart3, Menu, BookA, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()
  const { isOpen, toggle } = useSidebar()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <>
      <div
        className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden", isOpen ? "block" : "hidden")}
        onClick={toggle}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-background",
          "transition-transform duration-300 ease-in-out",
          "border-r",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex h-18 items-center border-b px-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-semibold">Inscripciones cursos FESC</span>
            <img src="/fescoficial.png" alt="FESC Logo" className="h-15 object-contain" />
          </div>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={toggle}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col h-[calc(100vh-3.5rem)]">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Botón de Cerrar sesión */}
          <div className="border-t p-4">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full flex justify-start gap-3 text-red-500 hover:bg-red-100 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Inscritos", href: "/users", icon: Users },
  { name: "Cursos", href: "/programas", icon: BookA },
  { name: "Analiticas", href: "/analiticas", icon: BarChart3 },
]
