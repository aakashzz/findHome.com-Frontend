"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, CheckCircle, XCircle, Clock, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getBookingForCustomer } from "@/lib/api/house.method"

// Define types
type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed"

interface Booking {
  id: string
  propertyName: string
  propertyImage: string
  location: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: BookingStatus
  createdAt: string
}

// Sample data
const bookings: Booking[] = [
  {
    id: "BK-12345",
    propertyName: "Luxurious Beachfront Villa",
    propertyImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Malibu, CA",
    checkIn: "2023-12-15",
    checkOut: "2023-12-22",
    guests: 4,
    totalPrice: 2450,
    status: "confirmed",
    createdAt: "2023-11-15T10:15:00Z",
  },
  {
    id: "BK-12346",
    propertyName: "Modern Downtown Loft",
    propertyImage:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "New York, NY",
    checkIn: "2024-01-10",
    checkOut: "2024-01-15",
    guests: 2,
    totalPrice: 1800,
    status: "pending",
    createdAt: "2023-11-20T14:30:00Z",
  },
  {
    id: "BK-12347",
    propertyName: "Cozy Mountain Cabin",
    propertyImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Aspen, CO",
    checkIn: "2023-11-05",
    checkOut: "2023-11-10",
    guests: 3,
    totalPrice: 1400,
    status: "completed",
    createdAt: "2023-10-01T09:45:00Z",
  },
  {
    id: "BK-12348",
    propertyName: "Charming Countryside Cottage",
    propertyImage:
      "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Cotswolds, UK",
    checkIn: "2023-09-20",
    checkOut: "2023-09-25",
    guests: 2,
    totalPrice: 900,
    status: "cancelled",
    createdAt: "2023-08-15T11:20:00Z",
  },
  {
    id: "BK-12349",
    propertyName: "Sleek City Apartment",
    propertyImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Tokyo, Japan",
    checkIn: "2024-02-15",
    checkOut: "2024-02-20",
    guests: 2,
    totalPrice: 2100,
    status: "confirmed",
    createdAt: "2023-11-25T16:40:00Z",
  },
  {
    id: "BK-12350",
    propertyName: "Historic Townhouse",
    propertyImage:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Boston, MA",
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    guests: 5,
    totalPrice: 1900,
    status: "confirmed",
    createdAt: "2023-11-30T13:15:00Z",
  },
]

const BookingList: React.FC = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date-desc")
  const [viewType, setViewType] = useState<string>("list")
  const [bookingList,setBookingList] = useState<Array<any>>([])
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get status color and icon
  const getStatusDetails = (status: BookingStatus) => {
    switch (status) {
      case "confirmed":
        return {
          color: "bg-green-500",
          textColor: "text-green-500",
          icon: <CheckCircle className="h-4 w-4" />,
        }
      case "pending":
        return {
          color: "bg-yellow-500",
          textColor: "text-yellow-500",
          icon: <Clock className="h-4 w-4" />,
        }
      case "cancelled":
        return {
          color: "bg-red-500",
          textColor: "text-red-500",
          icon: <XCircle className="h-4 w-4" />,
        }
      case "completed":
        return {
          color: "bg-blue-500",
          textColor: "text-blue-500",
          icon: <CheckCircle className="h-4 w-4" />,
        }
      default:
        return {
          color: "bg-gray-500",
          textColor: "text-gray-500",
          icon: <Clock className="h-4 w-4" />,
        }
    }
  }

  // Filter and sort bookings
  const filteredBookings = bookingList
    .filter(
      (booking) =>
        (statusFilter === "all" || booking.status === statusFilter) &&
        (
          booking.location?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          booking.id?.toLowerCase()?.includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "date-desc":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "price-asc":
          return a.totalPrice - b.totalPrice
        case "price-desc":
          return b.totalPrice - a.totalPrice
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  // Handle booking click
  const handleBookingClick = (bookingId: string) => {
    router.push(`/booking/${bookingId}`)
  }
  //call api to get Booking Details
  useEffect(()=>{
    getBookingForCustomer().then((data)=>{
      console.log(data)
      setBookingList(data);
    }).catch((error)=>{
      setBookingList(error)
    })

  },[])
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Bookings</h1>
              <p className="text-muted-foreground">Manage and view all your property bookings</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="list">List View</SelectItem>
                  <SelectItem value="grid">Grid View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by property name, location or booking ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 w-full md:w-1/2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Home className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No bookings found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : viewType === "list" ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => {
                      const statusDetails = getStatusDetails(booking.status)
                      return (
                        <TableRow
                          key={booking.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleBookingClick(booking.id)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={booking?.home?.thumbnail || "/placeholder.svg"}
                                alt={booking?.home?.propertyType}
                                className="h-10 w-10 rounded-md object-cover"
                              />
                              <div>
                                <div className="font-medium">{booking?.home?.propertyType}</div>
                                <div className="text-sm text-muted-foreground">{booking?.home?.address}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking?.booking_date?.slice(0,15)}</TableCell>
                          <TableCell>{booking?.home?.rent_price}</TableCell>
                          <TableCell >
                            <Badge className={`${statusDetails.color} text-white`}>
                              <span className="flex items-center gap-1">
                                {statusDetails.icon}
                                {booking?.bookingStatus?.charAt(0).toUpperCase() + booking?.bookingStatus?.slice(1)}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleBookingClick(booking.id)
                              }}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.map((booking) => {
                const statusDetails = getStatusDetails(booking.status)
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleBookingClick(booking.id)}
                    >
                      <div className="relative">
                        <img
                          src={booking?.home?.thumbnail || "/placeholder.svg"}
                          alt={booking?.home?.propertyType}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className={`absolute top-3 right-3 ${statusDetails.color} text-white`}>
                          <span className="flex items-center gap-1">
                            {statusDetails.icon}
                            {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                          </span>
                        </Badge>
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-lg mb-1">{booking.home?.propertyType}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{booking?.home?.address}</p>

                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Booking ID:</span>
                          </div>
                          <div className="font-medium">{booking.id}</div>
                        </div>


                        <div className="flex justify-between items-center mb-4">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Total:</span>
                          </div>
                          <div className="font-semibold">${booking?.home?.rent_price}</div>
                        </div>

                        <Button
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBookingClick(booking.id)
                          }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default BookingList

