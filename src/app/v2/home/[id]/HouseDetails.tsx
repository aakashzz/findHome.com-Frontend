"use client"
import Image from 'next/image'
import { Carousel } from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, Home, DollarSign, MapPin, Building } from 'lucide-react'
import RelatedHouses from './[id]/RelatedHouse'
import { HouseSchema } from '@/types/types'

export default function HouseDetails({ house }: { house: HouseSchema }) {
    const relatedHouses: any = [
        {
           id: "1",
           thumbnail: "/placeholder.svg?height=200&width=300",
           title: "2 BHK Apartment",
           location: "Downtown, Metropolis",
           price: 1200,
           BHK: 2,
        },
        {
           id: "2",
           thumbnail: "/placeholder.svg?height=200&width=300",
           title: "3 BHK Villa",
           location: "Suburbs, Metropolis",
           price: 1800,
           BHK: 3,
        },
        {
           id: "3",
           thumbnail: "/placeholder.svg?height=200&width=300",
           title: "1 BHK Studio",
           location: "City Center, Metropolis",
           price: 900,
           BHK: 1,
        },
     ];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{house.propertyType}</h1>
        <div className="flex items-center space-x-4 mb-6">
          <Badge>{house.status}</Badge>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-gray-700">{house.rating}</span>
          </div>
          <span className="text-gray-500">{house.address}</span>
        </div>

        <Carousel images={[house.thumbnail, ...(house.imagesOfHome || [])]} />

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{house.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Home className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{house.BHK} BHK</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{house.propertyType}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Deposit: ${house.depositAmount}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{house.city}, {house.state}</span>
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
                      {house?.imagesOfHome?.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
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
                    <p className="text-gray-700 mb-4">{house.address}, {house.city}, {house.state}, {house.country} - {house.pincode}</p>
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
                <div className="text-3xl font-bold mb-2">${house.rent_price}/month</div>
                <Button className="w-full mb-4">Contact Owner</Button>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Listed by</span>
                  <span>{house.user?.name}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <RelatedHouses relatedHouses={relatedHouses} />
      </div>
    </div>
  )
}

