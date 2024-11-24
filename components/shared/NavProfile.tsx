import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { AccouncName } from "./AccouncName"

export function NavProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex">My Account <UserIcon size={24} /></div>
        
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-7">
        <DropdownMenuLabel><AccouncName/></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup><Link href="/dashboard">
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem></Link>
          
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>          
        </DropdownMenuGroup>      
        <DropdownMenuSeparator />
        <DropdownMenuItem  onClick={() => signOut()}>
            <button>Log out</button>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
