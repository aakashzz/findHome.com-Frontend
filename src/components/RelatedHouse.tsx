import Image from 'next/image'
import Link from "next/link";
import { Card, CardContent } from '@/components/ui/card'
export type RelatedHouse = {
    id: string;
    thumbnail: string;
    propertyType: string;
    location: string;
    price: number;
    BHK: number;
    address: string;
    rent_price: string;
};

interface RelatedHousesProps {
    relatedHouses: RelatedHouse[];
}

export default function RelatedHouses({ relatedHouses }: RelatedHousesProps) {

  console.log("Related House Details",relatedHouses)
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Houses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedHouses?.map((house) => (
          <Link href={`/v2/home/${house.id}`} key={house.id}>
            <Card>
              <Image src={house.thumbnail} loading='lazy' alt={house.propertyType} width={300} height={200} className="w-full h-48 object-cover rounded-t-lg" />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{house.propertyType}</h3>
                <p className="text-gray-600 mb-2">{house.address}</p>
                <p className="font-bold">${house.rent_price}/month</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

