"use client";
import React from "react";
import { Moon, Sun, User, Home, LogOut, User2, Book } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutUserAccount } from "@/lib/api/authenticate.user";
import { toast } from "sonner";
import { useCustomDispatch } from "@/store/hooks";
import { logout } from "@/store/slice/user.slice";
import Link from "next/link";

export interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar: string;
      role: string;
   };
   className?: string;
}

function UserMenu({ user, className }: UserMenuProps) {
   const { setTheme, theme } = useTheme();
   const dispatch = useCustomDispatch();
  const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
   };
   async function handleLogout() {
    const logoutUser: any = await logoutUserAccount();
      if (!logoutUser) {
      toast.error("Something Have Issue In Logout Api");
    }
      dispatch(logout());
      toast.success("Logout Successfully");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={`relative h-8 w-8 rounded-full ${className || ''}`}>
          <Avatar className="h-11 w-11">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 " align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                     {user.name}
                  </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleTheme}>
               <>
                  <User2 className="mr-2 h-4 w-4" />
                  <Link href={`/profile/@${user.name}`}>Your Profile</Link>
               </>
        </DropdownMenuItem>
        <DropdownMenuItem>
               {user.role === "Owner" ? (
            <>
              <Home className="mr-2 h-4 w-4" />
              <Link href={`/owner/dashboard`}>Dashboard</Link>
            </>
          ) : (
            <>
              <Book className="mr-2 h-4 w-4" />
              <Link href={`/booking`}>Your Booking</Link>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
            <DropdownMenuItem className="" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   );
}

export default UserMenu;
