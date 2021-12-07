import { createSlice } from "@reduxjs/toolkit";
import {EnumLoggedInUserType} from "../../enums"



interface ILoginState{
    loggedInUserType:EnumLoggedInUserType,

}

const initialState:ILoginState={
    loggedInUserType:EnumLoggedInUserType.Admin,
}

const slice = createSlice({
    initialState,
    name:"login",
    reducers:{
        setAdmin(){

        }        
    }
})

export const LoginActions = slice.actions;
export const LoginReducer = slice.reducer;