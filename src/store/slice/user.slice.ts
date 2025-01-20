import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"

import {boolean, string, z} from "zod"
import { RootState } from "../store"
import { getCurrentUserAccount } from "@/lib/api/authenticate.user"

 const User = z.object({
    id: string().uuid().nullable(),
    name: string().nullable(),
    email: string().email().nullable(),
    isVerified: boolean(),
    profession: string(),
    role: string(),
    profilePicture: string().nullable(),
    mobileNumber : string(),
    address: string().nullable(),
})

export type UserModel = z.infer<typeof User>

interface UserState {
        status : "success" | "pending" | "error" | "failed";
        data : UserModel | null;
        error : string | null;
}

// async thunk using 
export const fetchCurrentUser = createAsyncThunk('user/getCurrentUser',
    async () => {
        const response = await getCurrentUserAccount();
        if(!response){
            throw new Error("Failed Your Token Has Expire Please Login/ SingUp");
        }
        return response
    }
)  


const initialState: UserState = {
    status : "pending",
    data :  null,
    error : null,
}

const UserSlice = createSlice({
    name:"getUser",
    initialState,
    reducers: {
       logout: function(state){
        state.status = "failed",
        state.data = null,
        state.error = "User Account Logout Please Login And SignUp"
       }

    },
    extraReducers:(builder)=> {
        builder.addCase(fetchCurrentUser.pending,(state)=>{
            state.status = "pending",
            state.data = null,
            state.error = null
        })
        .addCase(fetchCurrentUser.fulfilled,(state,action: PayloadAction<UserModel>)=>{
            state.status = "success",
            state.data = action.payload,
            state.error = null
        })
        .addCase(fetchCurrentUser.rejected, (state, action)=>{
            state.status = "error",
            state.error = "Failed User Not Authenticate | Authorize Please Login & SingUp"
        })
    },
})

export const {logout} = UserSlice.actions;
// export const CurrentUserDetails = (state: RootState) => state.getUser

export default UserSlice.reducer