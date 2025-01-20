import React from 'react'
import { Button } from '@/components/ui/button'
import { Star, MapPin, TrendingUp } from 'lucide-react'

interface Property {
  id: number
  title: string
  location: string
  price: number
  rating: number
  image: string
  trend: number
}

const TrendingProperties = () => {
  const trendingProperties: Property[] = [
    {
      id: 1,
      title: "Luxurious Beachfront Villa",
      location: "Malibu, CA",
      price: 5000,
      rating: 4.9,
      image: "/placeholder.svg?height=400&width=600",
      trend: 15
    },
    {
      id: 2,
      title: "Modern Downtown Loft",
      location: "New York, NY",
      price: 3500,
      rating: 4.8,
      image: "/placeholder.svg?height=400&width=600",
      trend: 12
    },
    {
      id: 3,
      title: "Cozy Mountain Cabin",
      location: "Aspen, CO",
      price: 2800,
      rating: 4.7,
      image: "/placeholder.svg?height=400&width=600",
      trend: 10
    }
  ]

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <TrendingUp className="inline-block mr-2 text-indigo-600" />
          Trending Properties
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trendingProperties.map((property) => (
            <div key={property.id} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 animate-slideUp">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
                  +{property.trend}% Trend
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <div className="flex items-center mb-2">
                  <MapPin className="text-indigo-600 mr-1" size={16} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{property.location}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-indigo-600">${property.price.toLocaleString()}/night</span>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" size={16} fill="currentColor" />
                    <span className="text-sm font-semibold">{property.rating.toFixed(1)}</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <a href={`/property/${property.id}`}>View Details</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingProperties

