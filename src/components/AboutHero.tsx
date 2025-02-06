import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beautiful homes"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
          <span className="block">Find Your Dream</span>
          <span className="block text-white">Rental Home</span>
        </h1>
        <p className="mt-3 text-xl sm:text-2xl max-w-md sm:max-w-xl mx-auto">
          Discover the perfect place to call home with findHome.com. Your journey to comfortable living starts here.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button className="text-lg px-8 py-3 bg-[#1DBF73]  hover:bg-[#1DBF80]text-white rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Start Your Search
          </Button>
          <Button
            variant="outline"
            className="text-lg px-8 py-3 bg-transparent hover:bg-white hover:text-blue-600 text-white border-2 border-white rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Learn More
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
        <a href="#features" className="text-white animate-bounce inline-block">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

