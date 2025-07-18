
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "./sidebar-provider"

export function Header() {
  const { toggle } = useSidebar()

  return (
    
      <div className="flex h-15 items-center px-4 gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggle}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="flex-1 flex justify-center items-center">
        <img src="/fescoficial.png" alt="FESC Oficial" className="h-20 object-contain" />
      </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
   
  )
}
