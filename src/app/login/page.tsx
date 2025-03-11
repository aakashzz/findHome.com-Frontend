"use client";
import React, { EventHandler, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
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
   const [error, setError] = useState<String>()
   const [view, setView] = useState<Boolean>(true)
   const {
      handleSubmit,
      register,
      formState: { errors },
   } = useForm<LoginForm>({
      resolver: zodResolver(LoginFormSchema),
   });
   const router = useRouter();
   function viewMethod(e: React.FormEvent) {
      e.preventDefault();
      setView((e)=>!e)
   }
   const onSubmit: SubmitHandler<LoginForm> = async (value: LoginForm) => {
      try {
         const { success, data, error } = LoginFormSchema.safeParse(value);
         if (!success) {
            console.error(error.errors);
         }
         const result = await loginUserAccount(data!);
         console.log(result);
         if (result.status >= 400) {
            setError(result?.response?.data?.error[0]?.message)
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
            {
               error && <p className="text-center font-beVietnamPro font-bold text-red-500">{error}</p>
            }
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
                           {errors.email?.message || error}
                        </p>
                     )}
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password">Password</Label>
                     <span className="flex justify-between items-center">

                        <Input
                           id="password"
                           type={view ? "password" : 'text'}
                           required
                           {...register("password", {
                              required: true,
                           })}
                           className="inline-block"
                        />
                        <button onClick={viewMethod}>
                           {
                              view ? (<EyeClosed className="ml-2 h-5 inline " />) : (<Eye className="ml-2 h-5 inline" />)
                           }
                        </button>

                     </span>
                     {errors.password?.message && (
                        <p className="text-sm font-inter text-red-600">
                           {errors.password?.message || error}
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
