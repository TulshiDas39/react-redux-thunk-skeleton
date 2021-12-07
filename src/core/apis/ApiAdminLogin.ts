import { AccountInfo } from "@azure/msal-common";
import {Intercept} from '..';
import { ApiRoutes } from "../../config";

export interface IApiLoginResponse{
  token:string;
}

export function ApiLogin(email:string,password:string){
    return Intercept.post<IApiLoginResponse>(`${ApiRoutes.Login}`,{ email,password});
}