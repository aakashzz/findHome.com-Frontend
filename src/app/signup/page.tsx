"use client";
import React, { useState } from "react";
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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@/components/ui/radio-group";
import { singUpUserAccount } from "@/lib/api/authenticate.user";
import { useRouter } from "next/navigation";


const SignupFormSchema = z.object({
   name: z.string().nullable(),
   email: z.string().email().nullable(),
   password: z.string().min(8).nullable(),
   role: z.string().nullable(),
});

export type SignupForm = z.infer<typeof SignupFormSchema>;

function SignupForm() {
   const router = useRouter();
   const {
      handleSubmit,
      register,
      control,
      formState: { errors },
   } = useForm<SignupForm>({
      resolver: zodResolver(SignupFormSchema),
   });
   const onSubmit: SubmitHandler<SignupForm> = async (value: SignupForm) => {
      const {data,success,error} = SignupFormSchema.safeParse(value);
      if (!success) {
         console.error(error.errors);
      }
      const result = await singUpUserAccount(data!);
      if(!result){
         return "Sorry Api Not Hit Please Check Now"
      }

      console.log(result)
      router.push("/notify-verify-email")
      return result;
   };
   
   return (
      <div className="container mx-auto px-4 py-8">
         <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
               <CardTitle className="font-beVietnamPro text-2xl font-extrabold">
                  FindHome.
                  <span className="text-2xl text-[#1DBF73]  font-beVietnamPro font-extrabold ">
                     com
                  </span>
               </CardTitle>

               <h3 className="font-inter  text-xl font-extrabold pt-2">
                  Sign up
               </h3>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="name">Name</Label>
                     <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name", {
                           required: true,
                        })}
                     />
                     {errors.name?.message && (
                        <p className="text-sm font-inter text-red-600">
                           {errors.name?.message}
                        </p>
                     )}
                  </div>
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
                  <div className="">
                     <Label htmlFor="role">Category</Label>
                     <div className="flex items-center pt-2">
                        {errors.role?.message && (
                           <p className="text-sm font-inter text-center text-red-600">
                              {errors.role?.message}
                           </p>
                        )}
                        <Controller
                           name="role"
                           control={control}
                           render={({ field }) => {
                              return (
                                 <RadioGroup
                                    onValueChange={field.onChange}
                                    color="red"
                                    className="flex flex-col space-y-1 mt-1"
                                    required
                                 >
                                    <div className="flex items-center space-x-2">
                                       <RadioGroupItem
                                          value="Customer"
                                          id="customer"
                                       />
                                       <Label htmlFor="customer">
                                          Customer
                                       </Label>
                                       <RadioGroupItem
                                          value="Owner"
                                          id="owner"
                                       />
                                       <Label htmlFor="owner">Owner</Label>
                                    </div>
                                 </RadioGroup>
                              );
                           }}
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password">Password</Label>
                     <Input
                        id="password"
                        type="password"
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

                  <Button type="submit" className="w-full mt-6">
                     Sign Up
                  </Button>
               </form>
            </CardContent>
            <CardFooter className="flex justify-center">
               <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                     Log in
                  </Link>
               </p>
            </CardFooter>
         </Card>
      </div>
   );
}

export default SignupForm;
