"use client"
// import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Confetti } from '@/components/Confetti'
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Calendar, DollarSign, ArrowRight } from 'lucide-react'

export default function BookingConfirmation() {
  const [isAnimating, setIsAnimating] = useState(true);
 

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-blue-50 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 flex flex-col justify-center items-center md:items-start bg-blue-600">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <CheckCircle className="w-24 h-24 text-green-400" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4 text-center md:text-left">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-white mb-8 text-center md:text-left">
              Congratulations! Your dream home awaits you.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300 text-lg px-8 py-3 rounded-full shadow-lg">
              View Details
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="md:w-1/2 p-8 bg-white">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Booking Details</h2>
            <div className="space-y-6">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4"
              >
                <div className="bg-blue-100 p-3 rounded-full">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Property</p>
                  <p className="text-lg font-medium text-black">Luxury Apartment, Downtown</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-4"
              >
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Move-in Date</p>
                  <p className="text-lg font-medium text-black">July 1, 2023</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-4"
              >
                <div className="bg-blue-100 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Rent</p>
                  <p className="text-lg font-medium text-black">$2,500</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {isAnimating && <Confetti />}
    </div>
  )
}


