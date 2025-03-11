"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Star, MapPin, BedDouble, Home, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Filters from "@/components/Filter";
import SearchResult from "./SearchResult";
import { useSearchParams } from "next/navigation";
import { searchHomeMethod } from "@/lib/api/search.home";
import { useRouter } from "next/navigation";
import BarLoader from "@/components/Loading";
import dynamic from "next/dynamic";
// import { Spinner } from "@/components/ui/spinner";

interface Property {
   id: string;
   thumbnail: string;
   propertyType: string;
   BHK: string;
   rating: string;
   address: string;
   city: string;
   country: string;
   rent_price: string;
   stats: string;
}
const HomeCard = dynamic(() => import('@/components/HomeCard'), {
   loading: () => <p>Loading...</p> // Optional loading fallback while the component loads
 });
const SearchResults: React.FC = () => {
   const searchTextTerm = useSearchParams().get("q");
   const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();

   const fetchHome = useCallback(async (signal?: AbortSignal) => {
      try {
         setLoading(true);
         setError(null);
         const result = await searchHomeMethod(searchTextTerm!);
         if (!result) {
            setError("Search Term Not Available");
            return;
         }
         setFilteredProperties(result);
      } catch (err) {
         if (!signal?.aborted) {
            setError("Failed to fetch results");
         }
      } finally {
         setLoading(false);
      }
   }, [searchTextTerm]);

   useEffect(() => {
      const controller = new AbortController();
      if (searchTextTerm) {
         fetchHome(controller.signal);
      }
      return () => controller.abort();
   }, [searchTextTerm, fetchHome]);

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchTextTerm) return;
      fetchHome();
   };

   return (
      <div className="flex justify-center ">
         {/* <div className="p-2 hidden lg:block">
            <Filters />
         </div> */}
         <div className="container w-full px-4 py-8 bg-gray-50">
            <form onSubmit={handleSearch} className="mb-8 flex justify-center">
               <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                     name="search"
                     type="text"
                     placeholder="Enter location..."
                     defaultValue={searchTextTerm || ""}
                     className="flex-grow w-full"
                  />
                  <Button type="submit" disabled={loading}>
                     {loading ? (
                        <BarLoader />
                     ) : (
                        <>
                           <Search className="h-4 w-4 sm:mr-2" />
                           <span className="hidden sm:inline">Search</span>
                        </>
                     )}
                  </Button>
               </div>
            </form>
            {error ? (
               <p className="text-center text-red-500">{error}</p>
            ) : !filteredProperties.length ? (
               <p className="text-center text-gray-500">
                  {loading ? "Searching..." : "No properties found. Try a different search term."}
               </p>
            ) : (
               <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-500 pl-2">
                     Search Result: {filteredProperties.length}
                  </p>
                  {filteredProperties.map((value) => (
                     <SearchResult key={value.id} {...value} />
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default SearchResults;
