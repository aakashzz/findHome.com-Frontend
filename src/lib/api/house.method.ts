import axios from "axios";
const config = {
    headers: {
       "Content-Type": "application/json  ",
       "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
 };

 type BookingType = {
   homeId : string,
   customerId: string,
   booking_date: string,
 }


export const fetchHouseDetails = async (id: string) => {
    try {
        const responseOfFetchHouse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/home/get-house/${id}`,config);
        if(!responseOfFetchHouse){
           return "Something Have Issue In Logout Api";
        }
        return responseOfFetchHouse.data.data;
     } catch (error) {
        console.error(error);
        return error;
     }
}

export const confirmBookingHouse = async (data: BookingType)=>{
   console.log("Data Cofnirm ",data)
   if(!data){
      return "Data Not Here.... Confirm Booking"
   }
   try {
         const resultOfConfirmBooking = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/booking/create`,data,config);
         if(!resultOfConfirmBooking){
            return "Api Error Please Check"
         }
         return resultOfConfirmBooking.data;
      } catch (error) {
         console.error(error);
        return error;
      }
}

export const getBookingForCustomer = async ()=>{
   try {
         const resultOfConfirmBooking = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/booking/getCustomer`,config);
         if(!resultOfConfirmBooking){
            return "Api Error Please Check"
         }
         return resultOfConfirmBooking.data;
      } catch (error) {
         console.error(error);
        return error;
      }
}

export const getBookingDetailsIdFetch = async (bookingId: string) =>{
   try {
      const resultOfConfirmBooking = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/booking/${bookingId}`,config);
      if(!resultOfConfirmBooking){
         return "Api Error Please Check"
      }
      return resultOfConfirmBooking.data;
   } catch (error) {
      console.error(error);
     return error;
   }
}