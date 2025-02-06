"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Upload, ImageIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addOwnerNewHome, updateHouseImage, UpdateImage, updateOneHomeDetails } from "@/lib/api/owner.home";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
   id: z.string().uuid().optional(),
   thumbnail: z.instanceof(File).optional(),
   imagesOfHome: z.array(z.instanceof(File)).optional(),
   status: z.enum(["Available", "Rented"]),
   rent_price: z.number().positive(),
   rating: z.number().min(0).max(5),
   address: z.string().min(1),
   city: z.string().min(1),
   state: z.string().min(1),
   country: z.string().min(1),
   pincode: z.string().min(1),
   description: z.string().min(1),
   depositAmount: z.string().min(1),
   BHK: z.number().positive().min(1),
   propertyType: z.string().min(1),
   contract_based_deal: z.enum(["Yes", "No"]),
   furnitureAvailable: z.enum(["Yes", "No"]),
   petsPermission: z.enum(["Yes", "No"]),
   parkingAvailable: z.enum(["Yes", "No"]),
   additionalFields: z
      .array(
         z.object({
            name: z.string().min(1),
            value: z.string().min(1),
         })
      )
      .optional(),
});
export type HomeFormData = z.infer<typeof schema>;

interface HomeFormProps {
   HomeData?: Partial<HomeFormData>; // Make it optional and partial
}

const AddHomeForm: React.FC<HomeFormProps> = ({ HomeData }) => {
   const router = useRouter()
   const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
      null
   );
   const [imagesPreview, setImagesPreview] = useState<string[]>([]);
   const { id } = useParams()
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
   } = useForm<HomeFormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         id: id as string || undefined,
         status: HomeData?.status || undefined,
         state: HomeData?.state || "",
         rent_price: HomeData?.rent_price || undefined,
         rating: HomeData?.rating || undefined,
         propertyType: HomeData?.propertyType || undefined,
         pincode: HomeData?.pincode || undefined,
         description: HomeData?.description || undefined,
         address: HomeData?.address || undefined,
         BHK: HomeData?.BHK || undefined,
         city: HomeData?.city || undefined,
         country: HomeData?.country || undefined,
         depositAmount: HomeData?.depositAmount || undefined,
         contract_based_deal: HomeData?.contract_based_deal || "No",
         furnitureAvailable: HomeData?.furnitureAvailable || "No",
         petsPermission: HomeData?.petsPermission || "No",
         parkingAvailable: HomeData?.parkingAvailable || "No",
      },
   });

   const onSubmit: SubmitHandler<HomeFormData> = async (data: HomeFormData) => {
      try {
         if (HomeData) {
            console.log("Data ", data)
            if (data.thumbnail || data.imagesOfHome) {
               const formData = new FormData();
               formData.append("houseId", id as string);
               formData.append("thumbnail", data.thumbnail ? data.thumbnail : '');

               if (data.imagesOfHome && Array.isArray(data.imagesOfHome)) {
                  data.imagesOfHome.forEach((file) => {
                     formData.append("imagesOfHome", file);
                  });
               }

               const updateImage = await updateHouseImage(formData as unknown as UpdateImage)
               if (!updateImage) {
                  toast.error("Sorry Images Not Update Try again")
               }
               toast.success("Images Are Update Successfully")
            }
            const formDataUpdate = new FormData()
            for (const [key, value] of Object.entries(data)) {
               if (value !== null && value !== undefined) {
                  formDataUpdate.append(key, String(value));
               }
            }
            const updateData = await updateOneHomeDetails(formDataUpdate as unknown as HomeFormData);
            if (!updateData) {
               toast.error("Data Not Update Try Again")
            }
            else if(updateData){
               toast.success("Data Update Successfully")
               return router.push(`/v2/home/${id}`)
            }

         } else {

            const formData = new FormData();
            console.log("Thumbnail Reo", data);

            const imagesOfHomeInBlob = data.imagesOfHome?.map((value) => {
               return new Blob([value], { type: "image/*" });
            });
            console.log("Images of Home in Blob", imagesOfHomeInBlob);

            for (const [key, value] of Object.entries(data)) {
               // Handle thumbnail file
               if (key === "thumbnail" && value instanceof File) {
                  formData.append(key, value);
               }
               // Handle multiple image files
               else if (
                  key === "imagesOfHome" &&
                  Array.isArray(imagesOfHomeInBlob)
               ) {
                  imagesOfHomeInBlob.forEach((blob, index) => {
                     formData.append(`imagesOfHome`, blob);
                  });
               }
               // Handle all other form fields
               else if (value !== null && value !== undefined) {
                  formData.append(key, String(value));
               }
            }

            const result = await addOwnerNewHome(
               formData as unknown as HomeFormData
            );
            console.log(result);
            if (result) {
               return router.push(`/v2/home/${result?.id}`)
            }

         }
      } catch (error) {
         console.log(error);
         return "Sorry Api Not Hit Please Check Now";
      }
   };

   const handleThumbnailChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      const file = event.target.files?.[0];
      if (file) {
         setValue("thumbnail", file);
         const reader = new FileReader();
         reader.onloadend = () => {
            setThumbnailPreview(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      console.log("Files Selected:", files);

      if (files) {
         // Set the files in the form state using React Hook Form
         setValue("imagesOfHome", Array.from(files));

         // Generate the previews
         const previews: string[] = [];
         Array.from(files).forEach((file, index) => {
            const reader = new FileReader();

            reader.onloadend = () => {
               previews[index] = reader.result as string; // Update the preview for each file
               setImagesPreview((prevState) => [
                  ...prevState,
                  reader.result as string,
               ]); // Correctly set the preview state
            };

            reader.readAsDataURL(file);
         });
      }
   };

   return (
      <Card className="w-full max-w-4xl my-4 mx-auto">
         <CardHeader>
            {HomeData ? (
               <CardTitle>Update Home</CardTitle>
            ) : (
               <CardTitle>Add New Home</CardTitle>
            )}
            <CardDescription>
               Enter the details of the new home listing
            </CardDescription>
         </CardHeader>
         <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
               <div className="space-y-4">
                  <div>
                     <Label htmlFor="thumbnail" className="block mb-2">
                        Thumbnail
                     </Label>
                     <div className="flex items-center justify-center w-full">
                        <label
                           htmlFor="thumbnail"
                           className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                           {thumbnailPreview ? (
                              <img
                                 src={typeof HomeData?.thumbnail === 'string' ? HomeData?.thumbnail : thumbnailPreview}
                                 alt="Thumbnail preview"
                                 className="w-full h-full object-cover rounded-lg"
                              />
                           ) : (
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                 <ImageIcon className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                       Click to upload
                                    </span>{" "}
                                    or drag and drop
                                 </p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG, JPG or GIF (MAX. 800x400px)
                                 </p>
                              </div>
                           )}
                           <Input
                              id="thumbnail"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleThumbnailChange}
                           />
                        </label>
                     </div>
                  </div>

                  <div>
                     <Label htmlFor="imagesOfHome" className="block mb-2">
                        Images of Home
                     </Label>
                     <div className="flex items-center justify-center w-full">
                        <label
                           htmlFor="imagesOfHome"
                           className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                 <span className="font-semibold">
                                    Click to upload
                                 </span>{" "}
                                 or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                 PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                           </div>
                           <Input
                              id="imagesOfHome"
                              type="file"
                              accept="image/**"
                              multiple
                              className="hidden"
                              onChange={handleImagesChange}
                           />
                        </label>
                     </div>
                     {(imagesPreview.length > 0 || (HomeData?.imagesOfHome && HomeData.imagesOfHome.length > 0)) && (
                        <div className="mt-4 grid grid-cols-3 gap-4">
                           {HomeData?.imagesOfHome ?
                              HomeData.imagesOfHome.map((preview, index) => (
                                 <img
                                    key={index}
                                    src={typeof preview === "string"
                                       ? preview
                                       : URL.createObjectURL(
                                          preview
                                       )}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-md"
                                 />
                              )) :
                              imagesPreview.map((preview, index) => (
                                 <img
                                    key={index}
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-md"
                                 />
                              ))
                           }
                        </div>
                     )}
                  </div>

                  <Separator />

                  <div>
                     <Label htmlFor="status">Status</Label>
                     <Select
                        onValueChange={(value) =>
                           setValue("status", value as "Available" | "Rented")
                        }
                     >
                        <SelectTrigger>
                           <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="Available">Available</SelectItem>
                           <SelectItem value="Rented">Rented</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div>
                     <Label htmlFor="rent_price">Rent Price</Label>
                     <Input
                        id="rent_price"
                        type="number"
                        {...register("rent_price", { valueAsNumber: true })}
                     />
                  </div>
                  {errors.rent_price && (
                     <p className="text-sm font-inter text-red-600">
                        {errors.rent_price.message}
                     </p>
                  )}
                  <div>
                     <Label htmlFor="rating">Rating</Label>
                     <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        {...register("rating", { valueAsNumber: true })}
                     />
                  </div>
                  {errors.rating && (
                     <p className="text-sm font-inter text-red-600">
                        {errors.rating.message}
                     </p>
                  )}
                  <div>
                     <Label htmlFor="address">Address</Label>
                     <Input id="address" {...register("address")} />
                  </div>
                  {errors.address && (
                     <p className="text-sm font-inter text-red-600">
                        {errors.address.message}
                     </p>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" {...register("city")} />
                     </div>
                     {errors.city && (
                        <p className="text-sm font-inter text-red-600">
                           {errors.city.message}
                        </p>
                     )}
                     <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" {...register("state")} />
                     </div>
                     {errors.state && (
                        <p className="text-sm font-inter text-red-600">
                           {errors.state.message}
                        </p>
                     )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" {...register("country")} />
                     </div>
                     {errors.country && (
                        <p className="text-sm font-inter text-red-600">
                           {errors.country.message}
                        </p>
                     )}
                     <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" {...register("pincode")} />
                     </div>
                     {errors.pincode && (
                        <p className="text-sm font-inter text-red-600">
                           {errors.pincode.message}
                        </p>
                     )}
                  </div>

                  <div>
                     <Label htmlFor="description">Description</Label>
                     <Textarea id="description" {...register("description")} />
                  </div>
                  {errors.description && (
                     <p className="text-sm font-inter text-red-600">
                        {errors.description.message}
                     </p>
                  )}

                  <div>
                     <Label htmlFor="depositAmount">Deposit Amount</Label>
                     <Input id="depositAmount" {...register("depositAmount")} />
                  </div>
                  {errors.depositAmount && (
                     <p className="text-sm font-inter text-red-600">
                        {errors.depositAmount.message}
                     </p>
                  )}

                  <div>
                     <Label htmlFor="BHK">BHK</Label>
                     <Input
                        id="BHK"
                        type="number"
                        {...register("BHK", { valueAsNumber: true })}
                     />
                  </div>
                  {errors.BHK && (
                     <p className="text-sm font-inter text-red-600">
                        {errors.BHK.message}
                     </p>
                  )}

                  <div>
                     <Label htmlFor="propertyType">Property Type</Label>
                     <Input id="propertyType" {...register("propertyType")} />
                  </div>
                  {errors.propertyType && (
                     <p className="text-sm font-inter text-red-600">
                        {errors.propertyType.message}
                     </p>
                  )}
                  <Separator />

                  <div className="space-y-4">
                     <Controller
                        name="contract_based_deal"
                        control={control}
                        render={({ field }) => (
                           <div>
                              <Label>Contract Based Deal</Label>
                              <RadioGroup
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                                 className="flex flex-col space-y-1"
                              >
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                       value="Yes"
                                       id="contract_based_deal_yes"
                                    />
                                    <Label htmlFor="contract_based_deal_yes">
                                       Yes
                                    </Label>
                                    <RadioGroupItem
                                       value="No"
                                       id="contract_based_deal_no"
                                    />
                                    <Label htmlFor="contract_based_deal_no">
                                       No
                                    </Label>
                                 </div>
                              </RadioGroup>
                           </div>
                        )}
                     />

                     <Controller
                        name="furnitureAvailable"
                        control={control}
                        render={({ field }) => (
                           <div>
                              <Label>Furniture Available</Label>
                              <RadioGroup
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                                 className="flex flex-col space-y-1"
                              >
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                       value="Yes"
                                       id="furnitureAvailable_yes"
                                    />
                                    <Label htmlFor="furnitureAvailable_yes">
                                       Yes
                                    </Label>
                                    <RadioGroupItem
                                       value="No"
                                       id="furnitureAvailable_no"
                                    />
                                    <Label htmlFor="furnitureAvailable_no">
                                       No
                                    </Label>
                                 </div>
                              </RadioGroup>
                           </div>
                        )}
                     />

                     <Controller
                        name="petsPermission"
                        control={control}
                        render={({ field }) => (
                           <div>
                              <Label>Pets Permission</Label>
                              <RadioGroup
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                                 className="flex flex-col space-y-1"
                              >
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                       value="Yes"
                                       id="petsPermission_yes"
                                    />
                                    <Label htmlFor="petsPermission_yes">
                                       Yes
                                    </Label>
                                    <RadioGroupItem
                                       value="No"
                                       id="petsPermission_no"
                                    />
                                    <Label htmlFor="petsPermission_no">
                                       No
                                    </Label>
                                 </div>
                              </RadioGroup>
                           </div>
                        )}
                     />

                     <Controller
                        name="parkingAvailable"
                        control={control}
                        render={({ field }) => (
                           <div>
                              <Label>Parking Available</Label>
                              <RadioGroup
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                                 className="flex flex-col space-y-1"
                              >
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                       value="Yes"
                                       id="parkingAvailable_yes"
                                    />
                                    <Label htmlFor="parkingAvailable_yes">
                                       Yes
                                    </Label>
                                    <RadioGroupItem
                                       value="No"
                                       id="parkingAvailable_no"
                                    />
                                    <Label htmlFor="parkingAvailable_no">
                                       No
                                    </Label>
                                 </div>
                              </RadioGroup>
                           </div>
                        )}
                     />
                  </div>
                  <Separator />
               </div>
            </form>
         </CardContent>
         <CardFooter>
            <Button
               type="submit"
               onClick={handleSubmit(onSubmit)}
               className="w-full"
            >
               Submit
            </Button>
         </CardFooter>
      </Card>
   );
};

export default AddHomeForm;