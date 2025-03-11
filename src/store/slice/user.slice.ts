import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean, string, z } from "zod";

const User = z.object({
   id: string().uuid().nullable(),
   name: string().nullable(),
   email: string().email().nullable(),
   isVerified: boolean(),
   profession: string(),
   role: string(),
   profilePicture: string().nullable(),
   mobileNumber: string(),
   address: string().nullable(),
});

export type UserModel = z.infer<typeof User>;

interface UserState {
   status: "success" | "pending" | "error" | "failed";
   data: UserModel | null;
   error: string | null;
}

const initialState: UserState = {
   status: "pending",
   data: null,
   error: null,
};

const UserSlice = createSlice({
   name: "getUser",
   initialState,
   reducers: {
      logout: function (state) {
         (state.status = "failed"),
            (state.data = null),
            (state.error = "User Account Logout Please Login And SignUp");
      },
      login: function(state, action: PayloadAction<UserModel>){
         (state.status = "success"),
            (state.data = action.payload),
            (state.error = null);
      }
   }
});

export const { logout,login } = UserSlice.actions;
export default UserSlice.reducer;