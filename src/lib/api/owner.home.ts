import axios from "axios";
import { HomeFormData } from "@/components/HomeForm";

export interface UpdateImage  {
   houseId: unknown ;
   thumbnail?: File;
   imagesOfHome?: any;
}
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
        return sendedCreateHome.data
   } catch (error) {
    console.error(error);
    return error;
   }
}
export async function updateOneHomeDetails(data: HomeFormData) {
   try {
      console.log("First Look Of Data",data)
      const sendedToUpdateHome = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/home/update`,data,{headers:{"Content-Type":"application/json"},withCredentials:true});
      console.log("Second Look Of Data",sendedToUpdateHome)
      if(!sendedToUpdateHome){
         return "Something Have Issue An Api Not Running ";
        }
        return sendedToUpdateHome
   } catch (error) {
    console.error(error);
    return error;
   }
}

export async function updateHouseImage(data: UpdateImage) {
   try {
      console.log("First Look Of Data",data)
      const sendedToUpdateHome = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/home/update-images`,data,config);
      console.log("Second Look Of Data",sendedToUpdateHome)
      if(!sendedToUpdateHome){
         return "Something Have Issue An Api Not Running ";
        }
        return sendedToUpdateHome
   } catch (error) {
    console.error(error);
    return error;
   }
}

