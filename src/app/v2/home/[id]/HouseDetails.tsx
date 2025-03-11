"use client"
import React, { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Home, DollarSign, MapPin, Building } from "lucide-react";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { toast } from "sonner";
import RelatedHouses, { RelatedHouse } from "@/components/RelatedHouse";
import { confirmBookingHouse, fetchHouseDetails } from "@/lib/api/house.method";
import { HouseSchema } from "@/types/types";
import Loading from "@/components/Loading"
import { useCustomSelector } from "@/store/hooks";

interface UserPageProps {
   id: string
}

type HouseResult = {
   result: HouseSchema,
   RelatedHouse: Array<RelatedHouse>
}

function HouseDetails({ id }: UserPageProps) {
   const [houseDetails, setHouseDetails] = useState<HouseResult>()
   const [loading, setLoading] = useState<boolean>(true);
   const userInstance = useCustomSelector((state) => state?.getUser.data)
   console.log("House", houseDetails)

   useEffect(() => {
      async function fetch() {
         setLoading(true)
         try {
            const fetchedHouse = await fetchHouseDetails(id);
            if (fetchedHouse) {
               setHouseDetails(fetchedHouse)
               setLoading(false)
            }
         } catch (error) {
            setLoading(false)
            toast.error("House Data Not Fetch try again")
         } finally {
            setLoading(false);
         }
      }
      fetch()
   }, [id]);


   async function confirmBookingMethod() {
      try {
         const response = await confirmBookingHouse({ homeId: houseDetails?.result?.id!, booking_date: Date().trim(), customerId: userInstance?.id! });
         if (!response) {
            toast.error(response.response?.data?.error[0]?.message || "House Booking Not Confirm")
         }
         return toast.success("Booking Confirm SuccessFully Go to your Booking and Watch status")
      } catch (error) {
         return toast.error("Something Not Happened")
      }
   }
   return (
      <div className="container mx-auto px-4 py-8">
         {
            loading ? (<div className="h-screen w-full flex justify-center items-center"><Loading /></div>) : (<>
               <div className="max-w-5xl mx-auto">
                  <h1 className="text-3xl font-bold mb-4">
                     {houseDetails?.result?.BHK} BHK,{houseDetails?.result?.propertyType}
                  </h1>
                  <div className="flex items-center space-x-4 mb-6">
                     <Badge>{houseDetails?.result?.status}</Badge>
                     <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-gray-700">
                           {houseDetails?.result?.rating}
                        </span>
                     </div>
                     <span className="text-gray-500">
                        {houseDetails?.result?.address}
                     </span>
                  </div>

                  <ImageCarousel
                     images={[
                        ...(houseDetails?.result?.imagesOfHome || []),
                     ]}
                  />

                  <div className="grid md:grid-cols-3 gap-10 mt-8">
                     <div className="md:col-span-2">
                        <Tabs defaultValue="details">
                           <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="details">
                                 Details
                              </TabsTrigger>
                              <TabsTrigger value="features">
                                 Features
                              </TabsTrigger>
                              <TabsTrigger value="location">
                                 Location
                              </TabsTrigger>
                           </TabsList>
                           <TabsContent value="details" className="mt-4">
                              <Card>
                                 <CardHeader>
                                    <CardTitle>Property Details</CardTitle>
                                 </CardHeader>
                                 <CardContent>
                                    <p className="text-gray-700 mb-4">
                                       {houseDetails?.result?.description}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                       <div className="flex items-center">
                                          <Home className="h-5 w-5 text-gray-400 mr-2" />
                                          <span>{houseDetails?.result?.BHK} BHK</span>
                                       </div>
                                       <div className="flex items-center">
                                          <Building className="h-5 w-5 text-gray-400 mr-2" />
                                          <span>
                                             {houseDetails?.result?.propertyType}
                                          </span>
                                       </div>
                                       <div className="flex items-center">
                                          <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                                          <span>
                                             Deposit: $
                                             {houseDetails?.result?.depositAmount}
                                          </span>
                                       </div>
                                       <div className="flex items-center">
                                          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                          <span>
                                             {houseDetails?.result?.city},{" "}
                                             {houseDetails?.result?.state}
                                          </span>
                                       </div>
                                    </div>
                                 </CardContent>
                              </Card>
                           </TabsContent>
                           <TabsContent value="features" className="mt-4">
                              <Card>
                                 <CardHeader>
                                    <CardTitle>Features</CardTitle>
                                 </CardHeader>
                                 <CardContent>
                                    <ul className="grid grid-cols-2 gap-2">
                                       <li className="flex items-center">
                                          <svg
                                             className="h-5 w-5 text-green-500 mr-2"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                             />
                                          </svg>
                                          Contract Based:{" "}
                                          {houseDetails?.result?.contract_based_deal}
                                       </li>
                                       <li className="flex items-center">
                                          <svg
                                             className="h-5 w-5 text-green-500 mr-2"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                             />
                                          </svg>
                                          Pets Allowed:{" "}
                                          {houseDetails?.result?.petsPermission}
                                       </li>
                                       <li className="flex items-center">
                                          <svg
                                             className="h-5 w-5 text-green-500 mr-2"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                             />
                                          </svg>
                                          Parking Available:{" "}
                                          {houseDetails?.result?.parkingAvailable}
                                       </li>
                                       <li className="flex items-center">
                                          <svg
                                             className="h-5 w-5 text-green-500 mr-2"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                             />
                                          </svg>
                                          Furniture Available:{" "}
                                          {houseDetails?.result?.furnitureAvailable}
                                       </li>
                                    </ul>
                                 </CardContent>
                              </Card>
                           </TabsContent>
                           <TabsContent value="location" className="mt-4">
                              <Card>
                                 <CardHeader>
                                    <CardTitle>Location</CardTitle>
                                 </CardHeader>
                                 <CardContent>
                                    <p className="text-gray-700 mb-4">
                                       {houseDetails?.result?.address},{" "}
                                       {houseDetails?.result?.city},{" "}
                                       {houseDetails?.result?.state},{" "}
                                       {houseDetails?.result?.country} -{" "}
                                       {houseDetails?.result?.pincode}
                                    </p>
                                    {/* Add a map component here if desired */}
                                 </CardContent>
                              </Card>
                           </TabsContent>
                        </Tabs>
                     </div>

                     <div>
                        <Card>
                           <CardHeader>
                              <CardTitle className="text-lg font-semibold">Pricing</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className=" md:text-2xl font-bold mb-2">
                                 ${houseDetails?.result?.rent_price} /month
                              </div>

                              <Button
                                 onClick={confirmBookingMethod}
                                 className="w-full mb-4"
                              >
                                 Booking Now
                              </Button>


                              <div className="flex items-center justify-between text-sm text-gray-500">
                                 <span>Listed by</span>
                                 <span>{houseDetails?.result?.user?.name}</span>
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  </div>

               </div>
               <RelatedHouses relatedHouses={houseDetails?.RelatedHouse!} />
            </>
            )
         }
      </div>

   )
}

export default HouseDetails