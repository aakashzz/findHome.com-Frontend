"use client"
import HomeCard from "@/components/HomeCard";
import TrendingProperties from "@/components/TreadingProperties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCurrentUserAccount } from "@/lib/api/authenticate.user";
import { useCustomDispatch } from "@/store/hooks";
import { login, logout } from "@/store/slice/user.slice";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Home() {
  const dispatch = useCustomDispatch();
  const [searchText,setSearchText] = useState<string>("")
  useLayoutEffect(()=>{
    getCurrentUserAccount().then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
  },[])
    const topRatedHomes = [
        {
          id: 1,
          title: "Charming Parisian Apartment",
          location: "Paris, France",
          price: 4200,
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1524431144429-03fdd30eee26?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          id: 2,
          title: "Tropical Island Bungalow",
          location: "Bali, Indonesia",
          price: 1800,
          rating: 4.6,
          image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          id: 3,
          title: "Historic City Center Flat",
          location: "Rome, Italy",
          price: 3800,
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1544397838-37a35169ebf0?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ]
    
  return (
    <div className="min-h-screen dark:bg-gray-900 font-be-vietnam-pro">
      
      <header className="relative bg-cover bg-center h-[550px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1721149122657-7b5440f39160?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/80"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn font-beVietnamPro">Find Your Perfect Home</h1>
          <p className="text-lg sm:max-w-xl sm:mx-auto  mb-8 animate-fadeIn animate-delay-100 font-inter">Discover the best rental properties at unbeatable prices. Connect directly with property owners and find your ideal home today.</p>
          <div className="w-full max-w-2xl mx-auto relative animate-fadeIn animate-delay-200">
            <Input 
              type="text"
              value={searchText}
              onChange={(e)=>setSearchText(e.target.value) }
              placeholder="Search for a location..."
              className="w-full pl-10 pr-4 py-5 font-inter font-medium bg-white rounded-full text-gray-800 border-none focus:ring-2 focus:ring-purple-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <Link href={`/search?q=${searchText}`}>
            <Button type="submit"  className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-inter">
              Search
            </Button>
            </Link>
          </div>
        </div>
      </header>

      <TrendingProperties />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Rated Homes</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {topRatedHomes.map((home) => (
              <HomeCard key={home.id} home={home} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              View All Properties
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
