"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
type RelatedHouse = {
    id: string;
    thumbnail: string;
    title: string;
    location: string;
    price: number;
    BHK: number;
    address: string;
    rentPrice: string;
};

interface RelatedHousesProps {
    relatedHouses: RelatedHouse[];
}

export default async function RelatedHouses({ relatedHouses }: RelatedHousesProps) {


  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Houses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedHouses.map((house) => (
          <Link href={`/house/${house.id}`} key={house.id}>
            <Card>
              <Image src={house.thumbnail} alt={house.title} width={300} height={200} className="w-full h-48 object-cover rounded-t-lg" />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{house.title}</h3>
                <p className="text-gray-600 mb-2">{house.address}</p>
                <p className="font-bold">${house.rentPrice}/month</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

