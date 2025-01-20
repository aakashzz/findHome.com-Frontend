import {z} from "zod"

const userSchema = z.object({
    id: z.string().uuid().nullable(),
    name: z.string(),
    email: z.string().email(),
    isVerified: z.boolean(),
    profession: z.string(),
    role: z.string(),
    profilePicture: z.string().nullable(),
    mobileNumber: z.string().nullable(),
    address:z.string(),
})

const houseSchema =  z.object({
    id: z.string(),
    thumbnail: z.string() ,
    imagesOfHome: z.array(z.string()).optional(),
    status: z.enum(["available", "not available"]),
    rent_price: z.number(),
    rating: z.number().min(0).max(5),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pincode: z.string(),
    description: z.string(),
    depositAmount: z.string(),
    BHK: z.number(),
    propertyType: z.string(),
    contract_based_deal: z.enum(["Yes", "No"]),
    furnitureAvailable: z.enum(["Yes", "No"]),
    petsPermission: z.enum(["Yes", "No"]),
    parkingAvailable: z.enum(["Yes", "No"]),
    additionalFields: z
       .array(
          z.object({
             name: z.string(),
             value: z.string(),
          })
       )
       .optional(),
    user: z.object({
        id: z.string().uuid().nullable(),
        name: z.string(),
        email: z.string().email(),
        isVerified: z.boolean(),
        profession: z.string(),
        role: z.string(),
        profilePicture: z.string().nullable(),
        mobileNumber: z.string().nullable(),
        address: z.string(),
    })
});

export type UserSchema = z.infer<typeof userSchema>
export type HouseSchema = z.infer<typeof houseSchema>