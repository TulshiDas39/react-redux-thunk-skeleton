import { AccountInfo } from "@azure/msal-common";
import {Intercept} from '..';
import { ApiRoutes } from "../../config";

export interface IApiLoginResponse{
  id: string;
  userName: string;
  emailAddress: string;
  roles: string[];
  token: string;
}

export function ApiAdminLogin(userName:string,password:string){
    return Intercept.post<IApiLoginResponse>(`${ApiRoutes.AdminLogin}`,{ userName,password});
}