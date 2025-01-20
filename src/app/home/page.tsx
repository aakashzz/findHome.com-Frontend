"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Phone, Mail } from 'lucide-react'

interface Booking {
  id: string
  username: string
  profileImage: string
  bookingDate: string
  requestStatus: 'pending' | 'accepted' | 'rejected'
  contactNumber: string
  email: string
}

const bookings: Booking[] = [
  {
    id: '1',
    username: 'John Doe',
    profileImage: 'https://example.com/john.jpg',
    bookingDate: '2024-03-15',
    requestStatus: 'pending',
    contactNumber: '+1234567890',
    email: 'john@example.com'
  },
  {
    id: '2',
    username: 'Jane Smith',
    profileImage: 'https://example.com/jane.jpg',
    bookingDate: '2024-03-18',
    requestStatus: 'accepted',
    contactNumber: '+1987654321',
    email: 'jane@example.com'
  },
  {
    id: '3',
    username: 'Bob Johnson',
    profileImage: 'https://example.com/bob.jpg',
    bookingDate: '2024-03-20',
    requestStatus: 'pending',
    contactNumber: '+1122334455',
    email: 'bob@example.com'
  },
]

const OwnerPanel: React.FC = () => {
  const [bookingList, setBookingList] = useState<Booking[]>(bookings)

  const handleAccept = (id: string) => {
    setBookingList(bookingList.map(booking => 
      booking.id === id ? { ...booking, requestStatus: 'accepted' } : booking
    ))
  }

  const handleReject = (id: string) => {
    setBookingList(bookingList.map(booking => 
      booking.id === id ? { ...booking, requestStatus: 'rejected' } : booking
    ))
  }

  return (
    <div className="py-12 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold mb-6">Owner Panel - Booking Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingList.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={booking.profileImage} alt={booking.username} />
                    <AvatarFallback>{booking.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{booking.username}</span>
                </div>
              </TableCell>
              <TableCell>{booking.bookingDate}</TableCell>
              <TableCell>
                <Badge 
                  variant={booking.requestStatus === 'accepted' ? 'success' : 
                           booking.requestStatus === 'rejected' ? 'destructive' : 'default'}
                >
                  {booking.requestStatus.charAt(0).toUpperCase() + booking.requestStatus.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                {booking.requestStatus === 'pending' && (
                  <div className="space-x-2">
                    <Button onClick={() => handleAccept(booking.id)} variant="success">Accept</Button>
                    <Button onClick={() => handleReject(booking.id)} variant="destructive">Reject</Button>
                  </div>
                )}
                {booking.requestStatus === 'accepted' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Contact</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact Information</DialogTitle>
                        <DialogDescription>
                          Contact details for {booking.username}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="text-gray-500" />
                          <span>{booking.contactNumber}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="text-gray-500" />
                          <span>{booking.email}</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OwnerPanel

