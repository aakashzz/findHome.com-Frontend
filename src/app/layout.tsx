import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import StoreProvider from "./storeProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "FindHome.com",
   description: "Search Homes Of your requiring ",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <StoreProvider>
         <html lang="en">
            <body
               className={`${geistSans.variable} ${geistMono.variable} antialiased `}
            >
               <main className="mx-auto text-base gap-2">

                  <Navbar />
                  {children}
                  <Footer />
                  <Toaster />
               </main>

            </body>
         </html>
      </StoreProvider>
   );
}
