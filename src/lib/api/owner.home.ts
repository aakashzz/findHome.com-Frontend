import axios from "axios";
import { HomeFormData } from "@/app/owner/new-add-house/page";
const config = {
   headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Credentials": true,
   },
   withCredentials: true,
};

export async function addOwnerNewHome(data: HomeFormData) {
   try {
      console.log("First Look Of Data",data)
      const sendedCreateHome = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/home/create`,data,config);
      console.log("Second Look Of Data",sendedCreateHome)
      if(!sendedCreateHome){
         return "Something Have Issue An Api Not Running ";
        }
        return sendedCreateHome
   } catch (error) {
    console.error(error);
    return error;
   }
}

// export async function updateOneHomeDetails(data:HomeFormData){
//    try {
//       await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/home/update`,data,config)
//    } catch (error) {
//       console.error(error);
//     return error;
//    }
// }