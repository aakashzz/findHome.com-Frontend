"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, BedDouble, Home, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filter";
import SearchResult from "./SearchResult";
import { useSearchParams } from "next/navigation";
import { searchHome } from "@/lib/api/search.home";
import Link from "next/link";

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

const SearchResults: React.FC = () => {
   // this for search Bar
   const searchTextTerm = useSearchParams().get("q");
   const [searchTerm, setSearchTerm] = useState(searchTextTerm);
   const [filteredProperties, setFilteredProperties] = useState<Property[]>();

   useEffect(() => {
      async function fetchHome() {
         const result = await searchHome(searchTextTerm!);
         if (!result) {
            return "Search Term Not Available";
         }
         console.log("Your Result", result);

         setFilteredProperties(result);
      }
      fetchHome();
   }, [searchTerm]);

   const handleSearch = async () => {
      const result = await searchHome(searchTextTerm!);
      if (!result) {
         return "Search Term Not Available";
      }
      console.log("Your Result", result);

      setFilteredProperties(result);
   };

   return (
      <div className="flex ">
         <div className="p-2">
            <Filters />
         </div>
         <div className="container mx-auto px-4 py-8 bg-gray-50">
            <form className="mb-8 flex justify-center">
               <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                     type="text"
                     placeholder="Enter location..."
                     value={searchTerm!}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="flex-grow"
                  />
                  <Link href={`/search?q=${searchTerm}`}>
                     <Button onClick={handleSearch} className="">
                        <Search className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Search</span>
                     </Button>
                  </Link>
               </div>
            </form>
            {!filteredProperties?.length ? (
               <p className="text-center text-gray-500">
                  No properties found. Try a different search term.
               </p>
            ) : (
               <div className="space-y-4">
                  {filteredProperties.map((value) => {
                     return (
                        
                           <SearchResult
                              BHK={value.BHK}
                              address={value.address}
                              city={value.city}
                              country={value.country}
                              id={value.id}
                              propertyType={value.propertyType}
                              rating={value.rating}
                              rent_price={value.rent_price}
                              stats={value.stats}
                              thumbnail={value.thumbnail}
                              key={value.id}
                           />
                       
                     );
                  })}
               </div>
            )}
         </div>
      </div>
   );
};

export default SearchResults;
