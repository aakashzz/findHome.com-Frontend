"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Home, X, Calendar, DollarSign, User } from 'lucide-react'
import { cn } from "@/lib/utils"

type BookingStatus = 'requested' | 'approved' | 'paymentPending' | 'confirmed' | 'cancelled'

interface BookingDetails {
  id: string
  propertyName: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: BookingStatus
}

const steps = [
  { key: 'requested', title: 'Booking Requested', icon: Clock },
  { key: 'approved', title: 'Approved by Owner', icon: CheckCircle },
  { key: 'paymentPending', title: 'Payment Pending', icon: DollarSign },
  { key: 'confirmed', title: 'Booking Confirmed', icon: Home },
]

export function BookingProgress({ booking }: { booking: BookingDetails }) {
  const getStepStatus = (stepKey: string) => {
    const statusIndex = steps.findIndex(step => step.key === booking.status)
    const stepIndex = steps.findIndex(step => step.key === stepKey)
    if (booking.status === 'cancelled') return 'cancelled'
    if (stepIndex <= statusIndex) return 'complete'
    return 'incomplete'
  }

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl font-bold">Booking #{booking.id}</span>
          <Badge 
            variant={booking.status === 'confirmed' ? 'default' : 
                     booking.status === 'cancelled' ? 'destructive' : 'secondary'}
            className={cn(
              "text-sm py-1",
              booking.status === 'confirmed' && "bg-green-500 text-white hover:bg-green-600"
            )}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{booking.propertyName}</h3>
            <Separator className="my-2" />
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Check-in</p>
              <p className="font-medium">{booking.checkIn}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Check-out</p>
              <p className="font-medium">{booking.checkOut}</p>
            </div>
          </div>
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Guests</p>
              <p className="font-medium">{booking.guests}</p>
            </div>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="font-medium">${booking.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mb-4">Booking Progress</h4>
        <div className="relative">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-start mb-8 last:mb-0">
              <div className={cn(
                "z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-md",
                getStepStatus(step.key) === 'complete' ? "bg-green-500 border-green-500 text-white" :
                getStepStatus(step.key) === 'cancelled' ? "bg-red-500 border-red-500 text-white" :
                "bg-white border-gray-300 text-gray-400"
              )}>
                <step.icon className="w-5 h-5" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                <p className={cn(
                  "text-sm",
                  getStepStatus(step.key) === 'complete' ? "text-green-600" :
                  getStepStatus(step.key) === 'cancelled' ? "text-red-600" : "text-gray-500"
                )}>
                  {getStepStatus(step.key) === 'complete' ? 'Completed' : 
                   getStepStatus(step.key) === 'cancelled' ? 'Cancelled' : 'Pending'}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "absolute left-5 w-0.5 h-full -translate-x-1/2 translate-y-6",
                  getStepStatus(steps[index + 1].key) === 'complete' ? "bg-green-500" : "bg-gray-300"
                )} />
              )}
            </div>
          ))}
        </div>

        {booking.status === 'cancelled' && (
          <Card className="mt-8 bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center text-red-700 mb-2">
                <X className="w-5 h-5 mr-2" />
                <p className="font-semibold">Booking Cancelled</p>
              </div>
              <p className="text-sm text-red-600">
                We're sorry, but this booking has been cancelled. Please contact customer support for more information.
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

