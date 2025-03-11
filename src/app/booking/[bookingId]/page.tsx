"use client"
import BookingDetails from '@/components/BookingDetails'
import { useParams } from 'next/navigation'
import React from 'react'


type BookingDetails = {}

function page() {
    const {bookingId} = useParams<{ bookingId: string }>()
  return (
    <div>
        <BookingDetails bookingId={bookingId}/>
    </div>
  )
}

export default page