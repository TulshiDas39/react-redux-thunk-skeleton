import { AxiosResponse } from "axios";
import { IApiErrorModel } from ".";

export interface IApiResponseModel<T=any,E=any>{    
    response?:T;
    error?:IApiErrorModel<E>;
    statusCode?:number
}