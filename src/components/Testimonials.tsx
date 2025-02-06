import Image from "next/image"

const testimonials = [
  {
    content:
      "findHome.com made it incredibly easy for me to find my dream apartment. The search process was smooth, and I love my new home!",
    author: "Sarah Johnson",
    role: "Happy Renter",
    image: "/images/testimonial-1.jpg",
  },
  {
    content:
      "As a property owner, I've had great success listing my rentals on findHome.com. The platform attracts quality tenants and simplifies the entire process.",
    author: "Michael Chen",
    role: "Property Owner",
    image: "/images/testimonial-2.jpg",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-[#1DBF73] py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Hear from our users</span>
        </h2>
        <div className="mt-8 space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Image
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                  />
                  <div className="ml-4">
                    <p className="text-gray-900 font-semibold">{testimonial.author}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

