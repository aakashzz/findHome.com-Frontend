import { Home, Search, Shield, Clock } from "lucide-react"

const features = [
  {
    name: "Extensive Listings",
    description: "Access thousands of rental properties across various locations, styles, and price ranges.",
    icon: Home,
  },
  {
    name: "Smart Search",
    description: "Our advanced search algorithms help you find the perfect home that matches your criteria.",
    icon: Search,
  },
  {
    name: "Secure Transactions",
    description: "Enjoy peace of mind with our secure payment and verification systems for all rentals.",
    icon: Shield,
  },
  {
    name: "24/7 Support",
    description: "Our dedicated support team is always available to assist you throughout your rental journey.",
    icon: Clock,
  },
]

export default function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to rent
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Discover why findHome.com is the preferred platform for renters and property owners alike.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#1DBF73] text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

