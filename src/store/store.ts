
import { configureStore } from "@reduxjs/toolkit";
import  UserReducer  from "./slice/user.slice";
import BookingReducer from "./slice/booking.slice";
export const store = configureStore({
    reducer:{
        getUser: UserReducer,
        booking: BookingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch