"use client";
import React, { useEffect, useState,useLayoutEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";
import { useCustomSelector, useCustomDispatch } from "@/store/hooks";
import { UserModel, fetchCurrentUser, logout } from "../store/slice/user.slice";
import Link from "next/link";

interface NavbarType {
   name: string;
   href: string;
   status: string;
   role?: string;
}

export interface UserMenuProps {
   user: {
      name: string;
      email: string;
      avatar: string;
      role: string;
   };
}

const Navbar: React.FC = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
   const dispatch = useCustomDispatch();

   const { status, error, data } = useCustomSelector((state) => state.getUser);

   if (!data) {
      dispatch(fetchCurrentUser());
   }

  
   useEffect(() => {
      if (!data && status !== "success") {
         setIsLoggedIn(false);
      }
      setIsLoggedIn(true);
   }, [isLoggedIn,data]);
   // setIsLoggedIn(true)
   const navbarOption: Array<NavbarType> = [
      {
         name: "Home",
         href: "/home",
         status: "success",
         role: "Customer",
      },
      {
         name: "Booking",
         href: "/booking",
         status: "success",
         role: "Owner",
      },
      {
         name: "Draft",
         href: "/draft-home",
         status: "success",
         role: "Customer",
      },
      {
         name: "Property",
         href: "/get-all-property",
         status: "success",
         role: "Owner",
      },
   ];

   // const [user, setUser] = useState({ name: "Guest" }); // Added user state
   console.log(status);

   const userRole = {
      name: data?.name || "",
      email: data?.email || "",
      avatar: data?.profilePicture || "",
      role: data?.role || "Guest",
   };

   return (
      <nav className="bg-background shadow-md">
         <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
               <div className="flex items-center">
                  <Link href="/" className="flex-shrink-0">
                     <span className="text-2xl font-extrabold font-beVietnamPro">
                        <span className="text-foreground font-beVietnamPro">
                           Find
                        </span>
                        <span className="text-primary font-beVietnamPro">
                           Home
                        </span>
                        <span className="text-[#1DBF73] font-beVietnamPro">
                           .com
                        </span>
                     </span>
                  </Link>
               </div>
               <div className="hidden md:block">
                  {error && <p>{error}</p>}
                  <div className="ml-10 flex items-center space-x-1 font-light text-base">
                     {/* Navigation links with optimized rendering */}
                     {status === "success" && data && (
                        <>
                           {navbarOption
                              .filter((value) => value.role === data?.role)
                              .map((value, index) => (
                                 <NavLink key={index} href={value.href}>
                                    {value.name}
                                 </NavLink>
                              ))}
                        </>
                     )}

                     {/* Static nav links */}
                     <NavLink href="/about">About</NavLink>
                     <NavLink href="/contact">Contact</NavLink>
                     <NavLink href="/feedback">Feedback</NavLink>

                     {/* Auth section */}
                     {status === "success" && data && isLoggedIn ? (
                        <div className="flex items-center gap-x-3">
                           <UserMenu
                              user={userRole}
                              className="transition-transform hover:scale-105"
                           />
                           <span className="text-base font-medium text-primary">
                              {userRole.name}
                           </span>
                        </div>
                     ) : (
                        <div className="flex items-center gap-2">
                           <Link href="/signup">
                              <Button
                                 className="transition-all hover:scale-105"
                                 variant="default"
                              >
                                 Sign Up  
                              </Button>
                           </Link>
                           <Link href="/login">
                              <Button
                                 className="bg-white hover:bg-gray-100 text-black transition-all hover:scale-105"
                                 variant="outline"
                              >
                                 Log In
                              </Button>
                           </Link>
                        </div>
                     )}
                  </div>
               </div>
               <div className="md:hidden">
                  <button
                     onClick={() => setIsOpen(!isOpen)}
                     className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-background focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                     <span className="sr-only">Open main menu</span>
                     {isOpen ? (
                        <X className="block h-6 w-6" aria-hidden="true" />
                     ) : (
                        <Menu className="block h-6 w-6" aria-hidden="true" />
                     )}
                  </button>
               </div>
            </div>
         </div>

         {isOpen && (
            <div className="md:hidden">
               <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {data &&
                     status === "success" &&
                     navbarOption.map((value) => {
                        return (
                           value.role === data?.role && (
                              <MobileNavLink href={value.href}>
                                 {value.name}
                              </MobileNavLink>
                           )
                        );
                     })}
                  <MobileNavLink href="#about">About</MobileNavLink>
                  <MobileNavLink href="#contact">Contact</MobileNavLink>
                  {data && status === "success" && isLoggedIn ? (
                     <div className="pt-4 pl-4">
                        <UserMenu user={userRole} />
                     </div>
                  ) : (
                     <>
                        <Button className="w-full mt-2">
                           <MobileNavLink href="/signup">Sign Up</MobileNavLink>
                        </Button>
                        <Button className="w-full mt-2">
                           <MobileNavLink href="/login">Log In</MobileNavLink>
                        </Button>
                     </>
                  )}
               </div>
            </div>
         )}
      </nav>
   );
};

const NavLink: React.FC<{
   href: string;
   children: React.ReactNode;
   className?: string; // Make className optional
}> = ({ href, children, className }) => (
   <Link
      href={href}
      className={
         className ||
         "text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
      }
   >
      {children}
   </Link>
);

const MobileNavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
   href,
   children,
}) => (
   <Link
      href={href}
      className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
   >
      {children}
   </Link>
);

export default Navbar;
