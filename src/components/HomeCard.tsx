import React from 'react'
import { Button } from '@/components/ui/button'
import { Star, MapPin } from 'lucide-react'

interface Property {
  id: number
  title: string
  location: string
  price: number
  rating: number
  image: string
}

const HomeCard = ({ home }: { home: Property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 dark:bg-gray-800 animate-slideUp">
      <div className="relative h-48">
        <img
          src={home.image}
          alt={home.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{home.title}</h3>
        <div className="flex items-center mb-2">
          <MapPin className="text-indigo-600 mr-1" size={16} />
          <span className="text-sm text-gray-600 dark:text-gray-300">{home.location}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-indigo-600">${home.price.toLocaleString()}/night</span>
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" size={16} fill="currentColor" />
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{home.rating.toFixed(1)}</span>
          </div>
        </div>
        <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
          <a href={`/home/${home.id}`}>View Details</a>
        </Button>
      </div>
    </div>
  )
}

export default HomeCard

