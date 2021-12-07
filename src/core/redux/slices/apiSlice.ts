import { combineReducers } from "@reduxjs/toolkit";
import { ThunkGetUser, ThunkLogin } from "..";
import { CreateReducerFromThunk } from "../createThunkReducer";


const reducers = {
    user:CreateReducerFromThunk(ThunkGetUser),
    login:CreateReducerFromThunk(ThunkLogin)
}

export const ReducerApi = combineReducers(reducers);

export type ReducerApiState = ReturnType<typeof ReducerApi>;