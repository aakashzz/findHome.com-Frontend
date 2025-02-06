import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, BedDouble, Home } from "lucide-react";
import Link from "next/link";

type Props = {
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
};
 function SearchResult({
   id,
   thumbnail,
   propertyType,
   BHK,
   address,
   city,
   country,
   rating,
   rent_price,
   stats,
}: Props) {
   let index = 4;
   return (
      <div className="space-y-6">
         <motion.div
            key={id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
         >
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row">
               <div className="sm:w-1/3 cursor-pointer">
                  <Link href={`/v2/home/${id}`}>
                     <img
                        src={thumbnail}
                        alt={propertyType}
                        className="w-full h-48 sm:h-full object-cover"
                     />
                  </Link>
               </div>
               <div className="p-4 sm:w-2/3 flex flex-col justify-between">
                  <div>
                     <h3 className="text-xl font-semibold mb-2">{address}</h3>
                     <div className="flex items-center mb-2">
                        <MapPin className="text-gray-400 mr-1" size={16} />
                        <span className="text-gray-600 text-sm">
                           {city}/{country}
                        </span>
                     </div>
                     <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center">
                           <BedDouble
                              className="text-gray-400 mr-1"
                              size={16}
                           />
                           <span className="text-gray-600 text-sm">
                              {BHK} BHK
                           </span>
                        </div>
                        <div className="flex items-center">
                           <Home className="text-gray-400 mr-1" size={16} />
                           <span className="text-gray-600 text-sm">
                              {propertyType}
                           </span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                     <span className="text-2xl font-bold text-primary">
                        ${rent_price}/month
                     </span>
                     <div className="flex items-center">
                        <Star
                           className="text-yellow-400 mr-1"
                           size={16}
                           fill="currentColor"
                        />
                        <span className="text-gray-600 text-sm">{rating}</span>
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
   );
}

export default SearchResult;
