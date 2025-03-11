import BookingDetails from '@/components/BookingDetails'
import BookingList from '@/components/BookingList'
import { getBookingForCustomer } from '@/lib/api/house.method'
import React from 'react'

type Props = {}

function page({}: Props) {

  return (
    <div className='min-h-screen'>
        <BookingList />
    </div>
  )
}

export default page