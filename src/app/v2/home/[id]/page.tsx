import Loading from "@/components/Loading";
// import { useCustomSelector } from "@/store/hooks";
import { toast } from "sonner";
import RelatedHouses from "@/components/RelatedHouse";
import HouseDetails from "./HouseDetails";

interface PageProps {
   params: {
      id: string;
   };
}
const relatedHouses: any = [
   {
      id: "1",
      thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "2 BHK Apartment",
      location: "Downtown, Metropolis",
      price: 1200,
      BHK: 2,
   },
   {
      id: "2",
      thumbnail: "https://images.unsplash.com/photo-1560184897-cca79b749615?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "3 BHK Villa",
      location: "Suburbs, Metropolis",
      price: 1800,
      BHK: 3,
   },
   {
      id: "3",
      thumbnail: "https://images.unsplash.com/photo-1560449752-3fd4bdbe7df0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "1 BHK Studio",
      location: "City Center, Metropolis",
      price: 900,
      BHK: 1,
   },
];
const HouseDetail = async ({params}: {params: Promise<{ id: string }>}) => {
   const id  = (await params).id

   //TODO: confirmBooking Method RE add and userRole setup 

   // const confirmBookingMethod = async (event: React.FormEvent) => {
   //    event.preventDefault();

   //    try {
         // if(userRole === 'pending'){
         //    console.log("Redirected")
         //    router.push("/login")
         // }
   //       const userId = houseDetails?.user?.id;
   //        if (!houseDetails?.id || !userId) {
   //          return "Required Fields Not Collected";
   //       }
   //       const data = {
   //          homeId: houseDetails.id,
   //          customerId: userId,
   //          booking_date: Date.now(),
   //       };
   //       const result = await confirmBookingHouse(data);
   //       if (!result) {
   //          return <p>"Result Not Showing Check"</p>;
   //       }
   //       if (result.id) {
   //          return router.push(`/confirm-booking/${result.id}`);
   //       }
   //       toast.message(result)
   //    } catch (error) {
   //       console.error(error);
   //    }
   // };



   return (
      <div className="container mx-auto min-w-full px-4 py-4 bg-gray-50 min-h-screen">
         {id ? (
            <>
               <HouseDetails id={id as string} userRole={"Owner"} />
            </>
         ) : (
            <div className="min-h-screen flex justify-center ">
               <Loading />
            </div>
         )}
      </div>
   );
};

export default HouseDetail;


