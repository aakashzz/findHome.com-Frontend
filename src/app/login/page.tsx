"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Card,
   CardHeader,
   CardTitle,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserAccount } from "@/lib/api/authenticate.user";
import { useRouter } from "next/navigation";

const LoginFormSchema = z.object({
   email: z.string().email().nullable(),
   password: z.string().min(8),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;

function page() {
   const {
      handleSubmit,
      register,
      formState: { errors },
   } = useForm<LoginForm>({
      resolver: zodResolver(LoginFormSchema),
   });
   const router = useRouter();
   const onSubmit: SubmitHandler<LoginForm> = async (value: LoginForm) => {
      try {
         const { success, data, error } = LoginFormSchema.safeParse(value);
         if (!success) {
            console.error(error.errors);
         }
         const result = await loginUserAccount(data!);
         console.log(result);
         if (result.code === "ERR_NETWORK" || result.status >= 400) {
            return "Sorry Api Not Hit Please Check Now";
         }
         if (result) {
            router.push("/");
         }
         console.log(result);
      } catch (error) {
         console.log(error);
         return "Sorry Api Not Hit Please Check Now";
      }
   };
 

   return (
      <div className="container mx-auto px-4 py-8">
         <Card className="max-w-md mx-auto rounded-xl">
            <CardHeader className="text-center">
               <CardTitle className="font-beVietnamPro text-2xl font-extrabold">
                  FindHome.
                  <span className="text-2xl text-[#1DBF73]  font-beVietnamPro font-extrabold ">
                     com
                  </span>
               </CardTitle>

               <h3 className="font-inter  text-xl font-extrabold pt-2">
                  Login
               </h3>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email", {
                           required: true,
                        })}
                     />
                     {errors.email?.message && (
                        <p className="text-sm font-inter text-red-600">
                           {errors.email?.message}
                        </p>
                     )}
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password">Password</Label>
                     <Input
                        id="password"
                        type="password"
                        required
                        {...register("password", {
                           required: true,
                        })}
                     />
                     {errors.password?.message && (
                        <p className="text-sm font-inter text-red-600">
                           {errors.password?.message}
                        </p>
                     )}
                  </div>

                  <Link
                     href={"#"}
                     className="text-xs text-end   underline font-beVietnamPro font-medium text-gray-700"
                  >
                     Forgot Password
                  </Link>

                  <Button type="submit" className="w-full">
                     Log in
                  </Button>
               </form>
            </CardContent>
            <CardFooter className="flex justify-center">
               <p className="text-sm text-muted-foreground">
                  You Don't Have Account?{" "}
                  <a href="/signup" className="text-primary hover:underline">
                     Sign up
                  </a>
               </p>
            </CardFooter>
         </Card>
      </div>
   );
}

export default page;
