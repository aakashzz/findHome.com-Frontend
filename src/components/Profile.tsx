"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Lock, MapPin, Phone, Briefcase, UserCircle, Upload } from "lucide-react"
import { useCustomSelector } from "@/store/hooks"
import BarLoader from "@/components/Loading"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from 'sonner'

const profileSchema = z.object({
   id: z.string().uuid(),
   name: z.string().min(2, "Name must be at least 2 characters"),
   email: z.string().email("Invalid email address"),
   password: z.string().min(8, "Password must be at least 8 characters").optional(),
   address: z.string().min(5, "Address must be at least 5 characters"),
   mobileNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
   profession: z.string().min(2, "Profession must be at least 2 characters"),
   profilePicture: z.string(),
})

export type ProfileFormData = z.infer<typeof profileSchema>

const initialUserData: ProfileFormData & { role: string; profilePicture: string } = {
   id: "sdkjfbsdssg",
   name: "John Doe",
   email: "john.doe@example.com",
   password: "",
   address: "123 Luxury Lane, Prestige Heights, CA 90210",
   mobileNumber: "+1 (555) 123-4567",
   profession: "Real Estate Investor",
   role: "Premium Member",
   profilePicture: "/placeholder-user.jpg",
}

export default function UserProfile() {
   const [userData, setUserData] = useState(initialUserData)
   const [isEditing, setIsEditing] = useState(false)
   const userProfile = useCustomSelector(state => state?.getUser.data) || userData
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<ProfileFormData>({
      resolver: zodResolver(profileSchema),
      defaultValues: userProfile as ProfileFormData,
   })

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
         const reader = new FileReader()
         reader.onloadend = () => {
            setUserData((prev) => ({ ...prev, image: reader.result as string }))
         }
         reader.readAsDataURL(file)
      }
   }

   const onSubmitHandler: SubmitHandler<ProfileFormData> = (data: ProfileFormData) => {
      console.log("Updated user data:", data)
      setUserData({ ...userData, ...data })
      setIsEditing(false)
      toast.success("Profile updated successfully!")
   }

   return (
      <>
         {
            !userProfile ?
               <BarLoader /> : <>
                  <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                     <CardContent className="p-6">
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
                           <div className="flex flex-col items-center space-x-6 space-y-2">
                              <Avatar className="w-44 h-44 border-4 border-white shadow-lg">
                                 <AvatarImage src={userProfile.profilePicture!} className="h-full" alt={userData.name} />
                                 <AvatarFallback>{userProfile.name!}</AvatarFallback>
                              </Avatar>
                              {
                                 isEditing ? (<>
                                    <label
                                       htmlFor="image-upload"
                                       className="cursor-pointer text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200 flex items-center"
                                    >
                                       <Upload className="w-5 h-5 mr-1" />
                                       Upload Image
                                       <input
                                          id="image-upload"
                                          type="file"
                                          className="hidden"
                                          accept="image/*"
                                          onChange={handleImageUpload}
                                          disabled={!isEditing}
                                       />
                                    </label></>) : (<>
                                       <label
                                          htmlFor="image-delete"
                                          className="cursor-pointer text-sm font-medium bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200 flex items-center"
                                       >
                                          Delete
                                          <input
                                             id="image-delete"
                                             type="file"
                                             className="hidden"
                                             accept="image/*"
                                             onChange={handleImageUpload}
                                          // disabled={!isEditing}
                                          />
                                       </label>
                                    </>)
                              }

                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <ProfileField
                                 control={control}
                                 name="name"
                                 label="Name"
                                 icon={<User className="w-5 h-5 text-gray-500" />}
                                 error={errors.name}
                                 isEditing={isEditing}
                              />
                              <ProfileField
                                 control={control}
                                 name="email"
                                 label="Email"
                                 icon={<Mail className="w-5 h-5 text-gray-500" />}
                                 error={errors.email}
                                 isEditing={isEditing}
                                 type="email"
                              />
                              <ProfileField
                                 control={control}
                                 name="password"
                                 label="Password"
                                 icon={<Lock className="w-5 h-5 text-gray-500" />}
                                 error={errors.password}
                                 isEditing={isEditing}
                                 type="password"
                              />
                              <ProfileField
                                 control={control}
                                 name="mobileNumber"
                                 label="Contact No."
                                 icon={<Phone className="w-5 h-5 text-gray-500" />}
                                 error={errors.mobileNumber}
                                 isEditing={isEditing}
                                 type="tel"
                              />
                              <ProfileField
                                 control={control}
                                 name="profession"
                                 label="Profession"
                                 icon={<Briefcase className="w-5 h-5 text-gray-500" />}
                                 error={errors.profession}
                                 isEditing={isEditing}
                              />
                              <div className="space-y-1">
                                 <Label htmlFor="role" className="text-sm font-medium text-gray-700 flex items-center">
                                    <UserCircle className="w-5 h-5 text-gray-500 mr-2" />
                                    Membership
                                 <p className="text-xs pl-2 font-base text-red-400 inline">* Membership Feature Future To Apply</p>
                                 </Label>
                                 <Input id="role" value={userData.role} disabled className="w-full bg-gray-50 border-gray-300" />
                              </div>
                           </div>

                           <ProfileField
                              control={control}
                              name="address"
                              label="Address"
                              icon={<MapPin className="w-5 h-5 text-gray-500" />}
                              error={errors.address}
                              isEditing={isEditing}
                              multiline
                           />

                           <div className="flex justify-end pt-4">
                              {isEditing ? (
                                 <div className="space-x-4">
                                    <Button type="submit" variant="default">
                                       Save Changes
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                       Cancel
                                    </Button>
                                 </div>
                              ) : (
                                 <Button type="button" onClick={() => setIsEditing(true)} variant="default">
                                    Edit Profile
                                 </Button>
                              )}
                           </div>
                        </form>
                     </CardContent>
                  </Card>
               </>
         }


      </>
   )
}

interface ProfileFieldProps {
   control: any
   name: keyof ProfileFormData
   label: string
   icon: React.ReactNode
   error?: any
   isEditing: boolean
   type?: string
   multiline?: boolean
}

function ProfileField({
   control,
   name,
   label,
   icon,
   error,
   isEditing,
   type = "text",
   multiline = false,
}: ProfileFieldProps) {
   return (
      <div className="space-y-1">
         <Label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center">
            {icon}
            <span className="ml-2">{label}</span>
         </Label>
         <Controller
            name={name}
            control={control}
            render={({ field }) =>
               multiline ? (
                  <Textarea
                     {...field}
                     disabled={!isEditing}
                     className={`w-full bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${error ? "border-red-500" : ""}`}
                     rows={3}
                  />
               ) : (
                  <Input
                     {...field}
                     type={type}
                     disabled={!isEditing}
                     className={`w-full bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${error ? "border-red-500" : ""}`}
                  />
               )
            }
         />
         {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
   )
}

