import axios from "axios";
const config = {
    headers: {
       "Content-Type": "application/json",
       "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
 };

export async function searchHomeMethod(searchLocation:string){
    try {
            const searchHomeResult = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/search?q=${searchLocation}`,config);
            if(!searchHomeResult){
                return "Something Have Issue An Api Not Running ";
            }
            console.info(searchHomeResult);
            return searchHomeResult.data

    } catch (error) {
        console.error(error);
      return error;
    }
}