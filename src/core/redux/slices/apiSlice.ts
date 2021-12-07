import { combineReducers } from "@reduxjs/toolkit";
import { ThunkGetUsers, ThunkLogin } from "..";
import { CreateReducerFromThunk } from "../createThunkReducer";


const reducers = {
    users:CreateReducerFromThunk(ThunkGetUsers),
    login:CreateReducerFromThunk(ThunkLogin)
}

export const ReducerApi = combineReducers(reducers);

export type ReducerApiState = ReturnType<typeof ReducerApi>;