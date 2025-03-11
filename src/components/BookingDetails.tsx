"use client"

import type React from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  Users,
  CreditCard,
  Home,
  CheckCircle,
  XCircle,
  ClockIcon,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  CalendarIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getBookingDetailsIdFetch } from "@/lib/api/house.method"
import { useEffect, useState } from "react"
import { HouseSchema } from "@/types/types"
// Define types for our data
interface BookingStatus {
  status: "pending" | "confirmed" | "cancelled" | "completed"
  updatedAt: string
}

interface House {
  id: string
  title: string
  address: string
  city: string
  state: string
  country: string
  pincode: string
  images: string[]
  price: number
  rating: number
  propertyType: string
  bedrooms: string
  host: {
    name: string
    avatar: string
    phone: string
    email: string
  }
}

interface BookingDetails {
  id: string
  homeId: string
  customerId: string
  bookingDate: string
  home: HouseSchema
  bookingStatus: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
  updatedAt: string
}

// Sample data

type BookingId = {
  bookingId: string
}

const BookingDetails = ({bookingId}:BookingId) => {
  // const { house, bookingStatus } = bookingData
  const [house,setHouse] = useState<BookingDetails>({})
  // Format dates for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Calculate number of nights
  useEffect(()=>{
    getBookingDetailsIdFetch(bookingId).then((data)=>{
      setHouse(data)
    }).catch((error)=>{
      console.error(error);
    })
  },[])
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-5 w-5" />
      case "pending":
        return <ClockIcon className="h-5 w-5" />
      case "cancelled":
        return <XCircle className="h-5 w-5" />
      case "completed":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <ClockIcon className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left column - House details */}
          <div className="w-full md:w-2/3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Booking #{house.id}</CardTitle>
                    <CardDescription>Created on {formatDate(house.createdAt)}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(house?.bookingStatus)} text-white`}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(house.bookingStatus)}
                      {house.bookingStatus?.charAt(0).toUpperCase() + house.bookingStatus?.slice(1)}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* House images */}
                <div className="relative">
                  <img
                    src={house?.home?.thumbnail || "/placeholder.svg"}
                    alt={house.home?.propertyType!}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {house?.home?.imagesOfHome?.slice(1, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${house.home?.propertyType} ${index + 2}`}
                        className="w-16 h-16 object-cover rounded-md border-2 border-white"
                      />
                    ))}
                    {house.home?.imagesOfHome?.length! > 3 && (
                      <div className="w-16 h-16 bg-black bg-opacity-50 rounded-md border-2 border-white flex items-center justify-center text-white">
                        +{house.home?.imagesOfHome?.length! - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* House details */}
                <div>
                  <h3 className="text-xl font-semibold">{house.home?.propertyType}</h3>
                  <div className="flex items-center mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {house.home?.address}, {house.home?.city}, {house.home?.state}, {house.home?.country} - {house.home?.pincode}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Home className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {house.home?.propertyType} • {house.home?.BHK} BHK
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Booking details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Price per night:</span>
                      <span className="ml-2">${house.home?.rent_price}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>${house.home?.rent_price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>$100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$50</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${house.home?.rent_price}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Host details and actions */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Host details */}
            <Card>
              <CardHeader>
                <CardTitle>Host Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={house?.home?.user?.profilePicture!} alt={house.home?.user?.name} />
                    <AvatarFallback>{house?.home?.user?.name.charAt(0)!}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{house?.home?.user?.name}</h3>
                    <p className="text-sm text-muted-foreground">Property Owner</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{house?.home?.user?.mobileNumber && "Nothing"}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{house?.home?.user?.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking actions */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {house.bookingStatus === "confirmed" && (
                  <>
                    <Button variant="outline" className="w-full">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Modify Dates
                    </Button>
                    <Button variant="destructive" className="w-full">
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel Booking
                    </Button>
                  </>
                )}
                {house.bookingStatus === "pending" && (
                  <Button variant="destructive" className="w-full">
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Booking
                  </Button>
                )}
                {house.bookingStatus === "cancelled" && (
                  <Button variant="outline" className="w-full">
                    <Home className="mr-2 h-4 w-4" />
                    Book Again
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Host
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Support
                </Button>
              </CardContent>
            </Card>

            {/* Booking timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="rounded-full h-8 w-8 bg-green-500 flex items-center justify-center text-white">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="h-full w-0.5 bg-gray-200 my-1"></div>
                    </div>
                    <div>
                      <p className="font-medium">Booking Created</p>
                      <p className="text-sm text-muted-foreground">{formatDate(house.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="rounded-full h-8 w-8 bg-green-500 flex items-center justify-center text-white">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div className="h-full w-0.5 bg-gray-200 my-1"></div>
                    </div>
                    <div>
                      <p className="font-medium">Payment Completed</p>
                      <p className="text-sm text-muted-foreground">{formatDate(house.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="rounded-full h-8 w-8 bg-green-500 flex items-center justify-center text-white">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="h-full w-0.5 bg-gray-200 my-1"></div>
                    </div>
                    <div>
                      <p className="font-medium">Booking Confirmed</p>
                      <p className="text-sm text-muted-foreground">{formatDate(house.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default BookingDetails

