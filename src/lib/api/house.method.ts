import axios from "axios";
const config = {
    headers: {
       "Content-Type": "multipart/form-data",
       "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
 };

 type BookingType = {
   homeId : string,
   customerId: string,
   booking_date: number,
 }


export const fetchHouseDetails = async (id: string) => {
    try {
        const responseOfFetchHouse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/home/get-house/${id}`,config);
        if(!responseOfFetchHouse){
           return "Something Have Issue In Logout Api";
        }
        return responseOfFetchHouse.data;
     } catch (error) {
        console.error(error);
        return error;
     }
}

export const confirmBookingHouse = async (data: BookingType)=>{
   try {
      if(!data){
         return "Data Not Here.... Confirm Booking"
      }
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
         const resultOfConfirmBooking = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/booking/getCustomer`,config);
         if(!resultOfConfirmBooking){
            return "Api Error Please Check"
         }
         return resultOfConfirmBooking.data;
      } catch (error) {
         console.error(error);
        return error;
      }
}