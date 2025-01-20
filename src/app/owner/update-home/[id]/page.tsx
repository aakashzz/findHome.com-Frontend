"use client"
import React, { useEffect, useState } from 'react'
import HomeForm from '@/components/HomeForm'
import { fetchHouseDetails } from '@/lib/api/house.method'
import { useParams } from 'next/navigation'
import { HomeFormData } from '@/components/HomeForm';

function page() {
  const {id} = useParams();
  const [homeData,setHomeData] = useState<HomeFormData>()
  useEffect(()=>{
    async function fetchAvailableHouse() {
      try {
        const result = await fetchHouseDetails(id as string);
        if(!result){
          return "Empty Response Not Responsible"
        }
        setHomeData(result)
        console.log(result)
      } catch (error) {
        console.error(error)
        throw error
      }
    }

    fetchAvailableHouse()
  },[id])
  return (
    <div>
      {
        homeData ? 
        <HomeForm HomeData={homeData}/>
        : <>
          Loading.....
        </>
      }
    </div>
  )
}

export default page