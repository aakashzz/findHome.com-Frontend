'use client'
import React from "react"
import Loading from "@/components/Loading";
import { toast } from "sonner";
import RelatedHouses from "@/components/RelatedHouse";
import HouseDetails from "./HouseDetails";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const relatedHouses: any = [
   {
      id: "1",
      thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "2 BHK Apartment",
      location: "Downtown, Metropolis",
      price: 1200,
      BHK: 2,
   },
   {
      id: "2",
      thumbnail: "https://images.unsplash.com/photo-1560184897-cca79b749615?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "3 BHK Villa",
      location: "Suburbs, Metropolis",
      price: 1800,
      BHK: 3,
   },
   {
      id: "3",
      thumbnail: "https://images.unsplash.com/photo-1560449752-3fd4bdbe7df0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "1 BHK Studio",
      location: "City Center, Metropolis",
      price: 900,
      BHK: 1,
   },
];
const HouseDetail =  () => {
   const {id} = useParams<{ id: string }>()
   return (
      <div className="container mx-auto  px-4 py-4 bg-gray-50 min-h-screen">
         {id ? (
            <>
               <HouseDetails id={id}  />
            </>
         ) : (
            <div className="min-h-screen flex justify-center ">
               <Loading />
            </div>
         )}
      </div>
   );
};

export default HouseDetail;


