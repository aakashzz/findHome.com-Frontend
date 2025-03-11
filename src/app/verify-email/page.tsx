"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import Home from "./page";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { verifyUserEmailAccount } from "@/lib/api/authenticate.user";
import { toast } from "sonner";

function VerifyEmail() {
   const params = useSearchParams();
   const router = useRouter()
   const [verificationState, setVerificationState] = useState<
      "processing" | "success" | "verified"
   >("processing");

   const tokenValue = params.get("token");
   if (!tokenValue) {
      return "Token Value Not Get";
   }
   console.log(tokenValue);

   useEffect(() => {
      async function verifyEmail() {
         //TODO: Try to make perfect ui condition rendering and showing perfectly oraganise work
         try {
            const verifyAndLoginMethod = await verifyUserEmailAccount(tokenValue!);
            setVerificationState("success")
            if (!verifyAndLoginMethod) {
               return "Not Verify Email Your Verification Email Token Expire!";
            }
            if(verificationState === "verified"){
               return redirect("/")
            }
         } catch (error) {
            console.error(error)
            return error
         } finally{
            setVerificationState("verified");
            if(verificationState === "verified"){
               return redirect("/")
            }
         }
      }
      verifyEmail();
   }, [tokenValue]);

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
         {verificationState === "processing" && (
            <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               className="text-center"
            >
               <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
               <h2 className="text-2xl font-semibold mb-2">
                  Verifying your email
               </h2>
               <p className="text-muted-foreground">
                  Please wait while we confirm your email address...
               </p>
            </motion.div>
         )}

         {verificationState === "success" && (
            <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               className="text-center"
            >
               <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
               <h2 className="text-2xl font-semibold mb-2">Email Verified!</h2>
               <p className="text-muted-foreground">
                  Congratulations! Your email has been successfully verified.
               </p>
               <p className="text-muted-foreground">
                  Redirecting you to the home page...
               </p>
            </motion.div>
         )}
      </div>
   );
}

export default VerifyEmail;
