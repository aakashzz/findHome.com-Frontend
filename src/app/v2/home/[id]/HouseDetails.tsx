import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Home, DollarSign, MapPin, Building } from "lucide-react";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { toast } from "sonner";
import RelatedHouses from "@/components/RelatedHouse";
import { fetchHouseDetails } from "@/lib/api/house.method";
import Link from "next/link";
type Props = {
    id:string,
    userRole: string
}

async function HouseDetails({id,userRole}: Props) {
    const houseDetails = await fetchHouseDetails(id)
  return (
    <div className="container mx-auto px-4 py-8">
                  <div className="max-w-5xl mx-auto">
                     <h1 className="text-3xl font-bold mb-4">
                        {houseDetails.BHK} BHK,{houseDetails.propertyType}
                     </h1>
                     <div className="flex items-center space-x-4 mb-6">
                        <Badge>{houseDetails.status}</Badge>
                        <div className="flex items-center">
                           <Star className="h-5 w-5 text-yellow-400" />
                           <span className="ml-1 text-gray-700">
                              {houseDetails.rating}
                           </span>
                        </div>
                        <span className="text-gray-500">
                           {houseDetails.address}
                        </span>
                     </div>

                     <ImageCarousel
                        images={[
                           ...(houseDetails.imagesOfHome || []),
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
                                          {houseDetails.description}
                                       </p>
                                       <div className="grid grid-cols-2 gap-4">
                                          <div className="flex items-center">
                                             <Home className="h-5 w-5 text-gray-400 mr-2" />
                                             <span>{houseDetails.BHK} BHK</span>
                                          </div>
                                          <div className="flex items-center">
                                             <Building className="h-5 w-5 text-gray-400 mr-2" />
                                             <span>
                                                {houseDetails.propertyType}
                                             </span>
                                          </div>
                                          <div className="flex items-center">
                                             <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                                             <span>
                                                Deposit: $
                                                {houseDetails.depositAmount}
                                             </span>
                                          </div>
                                          <div className="flex items-center">
                                             <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                             <span>
                                                {houseDetails.city},{" "}
                                                {houseDetails.state}
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
                                             {houseDetails.contract_based_deal}
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
                                             {houseDetails.petsPermission}
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
                                             {houseDetails.parkingAvailable}
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
                                             {houseDetails.furnitureAvailable}
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
                                          {houseDetails.address},{" "}
                                          {houseDetails.city},{" "}
                                          {houseDetails.state},{" "}
                                          {houseDetails.country} -{" "}
                                          {houseDetails.pincode}
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
                                 <CardTitle>Pricing</CardTitle>
                              </CardHeader>
                              <CardContent>
                                 <div className=" md:text-2xl font-bold mb-2">
                                    ${houseDetails.rent_price}/month
                                 </div>
                                 {
                                    userRole === "Owner" ?
                                       <>
                                          <div className=" md:text-sm font-medium mb-2 mt-4">
                                             # Update House Details
                                          </div>
                                          <Button
                                             className="w-full mb-4 bg-[#1DBE30] hover:bg-[#1DBE80]"
                                          >
                                             <Link href={`/owner/update-home/${id}`}>
                                                Update Details
                                             </Link>
                                          </Button>
                                       </>
                                       :
                                       <Button
                                          // onClick={confirmBookingMethod}
                                          className="w-full mb-4"
                                       >
                                          Booking Now
                                       </Button>

                                 }
                                 <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>Listed by</span>
                                    <span>{houseDetails.user?.name}</span>
                                 </div>
                              </CardContent>
                           </Card>
                        </div>
                     </div>

                  </div>
                      {/* <RelatedHouses relatedHouses={relatedHouses} />  */}
               </div>
  )
}

export default HouseDetails