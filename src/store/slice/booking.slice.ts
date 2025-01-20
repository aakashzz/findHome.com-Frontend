import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {boolean, string, z} from "zod"
import { getCurrentUserAccount } from "@/lib/api/authenticate.user"

 const Booking = z.object({
    id: string().uuid().nullable(),
    homeId: string().uuid().nullable(),
    customerId: string().uuid().nullable(),
    booking_date: string().date(),
    bookingStatus: string().default("Pending")
})

export type BookingModel = z.infer<typeof Booking>

interface BookingState {
        status : "success" | "pending" | "error" | "failed";
        data : BookingModel | null;
        error : string | null;
}



const initialState: BookingState = {
    status : "pending",
    data :  null,
    error : null,
}

const BookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers: {
       getNewBooking : (state,action: PayloadAction<BookingModel>)=>{
        state.status = "success",
        state.data = action.payload,
        state.error = null
       },
       errorNewBooking: (state,action)=>{
        state.status = "error",
        state.data = null,
        state.data = action.payload
       }
    }
   
})

export const {getNewBooking,errorNewBooking} = BookingSlice.actions;
// export const CurrentUserDetails = (state: RootState) => state.getUser

export default BookingSlice.reducer