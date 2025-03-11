import axios from "axios";
import { SignupForm } from "@/app/signup/page";
import { LoginForm } from "@/app/login/page";

const config = {
   headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
   },
   withCredentials: true,
};

export async function singUpUserAccount(data: SignupForm) {
   try {
      const sendedFormDetails = await axios.post(
         `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/user/create`,
         data,
         config
      );
      if (!sendedFormDetails) {
         return "Something Have Issue An Api Not Running ";
      }
      console.log(sendedFormDetails);
      return sendedFormDetails.data;
   } catch (error) {
      console.error(error);
      return error;
   }
}

export async function verifyUserEmailAccount(token: string) {
   try {
      console.log("Token", token)
      const verifyEmailDetails = await axios.get(
         `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/user/verify-email?token=${token}`,
         config
      );

      if (!verifyEmailDetails) {
         console.log(verifyEmailDetails);
         return "Something Have Issue In Verify Email Api";
      }
      console.log("User EMail verify", verifyEmailDetails);
      if (verifyEmailDetails.data.id) {
         const { email, password } = verifyEmailDetails.data;
         const resultOfLoginUser = await loginUserAccount({ email, password });
         return resultOfLoginUser;
      }
      return verifyEmailDetails.data;
   } catch (error) {
      console.error(error);
      return error;
   }
}

export async function loginUserAccount(data: LoginForm) {
   try {
      const loginUserAccountDetails = await axios.post(
         `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/user/login`,
         data,
         config,
      );
      if (!loginUserAccountDetails) {
         console.log(loginUserAccountDetails);
         return "Something Have Issue In Verify Email Api";
      }
      return loginUserAccountDetails.data;
   } catch (error) {
      console.error(error);
      return error;
   }
}

export async function getCurrentUserAccount(){
   try {
      const loginUserAccountDetails = await axios.get(
         `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/user/get-user`,
         config
      );
      if (!loginUserAccountDetails) {
         console.log(loginUserAccountDetails);
         return "Something Have Issue In Verify Email Api";
      }
      return loginUserAccountDetails.data;
   } catch (error) {
      console.error(error);
      return error;
   }
}

export async function logoutUserAccount(){
   try {
      const logoutUserAccount = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/user/logout`,config);
      if(!logoutUserAccount){
         return "Something Have Issue In Logout Api";
      }
      return logoutUserAccount.data;
   } catch (error) {
      console.error(error);
      return error;
   }
}
