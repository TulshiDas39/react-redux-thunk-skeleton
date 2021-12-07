import {Intercept} from '..';
import { ApiRoutes } from "../../config";

export interface IApiLoginResponse{
  token:string;
}

export function ApiLoginDemo(email:string,password:string){
    return Intercept.post<IApiLoginResponse>(`${ApiRoutes.Login}`,{ email,password});
}