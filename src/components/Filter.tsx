import React from 'react';
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  bedrooms: string[];
  setBedrooms: (bedrooms: string[]) => void;
  propertyTypes: string[];
  setPropertyTypes: (types: string[]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
}

const Filters = () => {
 


  return (
    <div className="space-y-6 w-80 font-beVietnamPro p-4 h-full ">
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <Slider
          min={0}
          max={10000}
          step={100}

        />
        <div className="flex justify-between mt-2">
          <span>${8}</span>
          <span>${1}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Bedrooms</h3>
        <div className="space-y-2">
          {['1', '2', '3', '4+'].map((value) => (
            <div key={value} className="flex items-center">
              <Checkbox
                id={`bedroom-${value}`}
                
              />
              <Label htmlFor={`bedroom-${value}`} className="ml-2">
                {value} {value === '4+' ? 'or more' : ''} BHK
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Property Type</h3>
        <div className="space-y-2">
          {['Apartment', 'House', 'Villa', 'Studio'].map((type) => (
            <div key={type} className="flex items-center">
              <Checkbox
                id={`type-${type}`}
                />
              <Label htmlFor={`type-${type}`} className="ml-2">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Minimum Rating</h3>
        <Slider
          min={0}
          max={5}
          step={0.1}
        
        />
        <div className="mt-2">
          {2} stars and above
        </div>
      </div>
    </div>
  );
};

export default Filters;

