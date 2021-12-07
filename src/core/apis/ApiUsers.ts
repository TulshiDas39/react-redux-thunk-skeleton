import {Intercept} from '../intercepts';
import {ApiRoutes} from '../../config';

export interface IApiUserResponse {
  id: string;
  userName: string;
  emailAddress: string;
  roles: string[];
  token: string;
  ambassador: any;
}


export function ApiUsers(userId:string){
    return Intercept.get<IApiUserResponse>(`${ApiRoutes.GetUsers}/${userId}`);
}