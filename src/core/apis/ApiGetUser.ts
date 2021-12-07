import {Intercept} from '../intercepts';
import {ApiRoutes} from '../../config';
import { IUserInfo } from '..';


export interface IGetUserResponse{
    data:IUserInfo;
}

export function ApiGetUser(userId:string){
    return Intercept.get<IGetUserResponse>(`${ApiRoutes.GetUsers}/${userId}`);
}