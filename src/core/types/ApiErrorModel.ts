import { AxiosResponse } from "axios";


export interface IApiErrorModel<T=any>{
    error?: T;
    message: string;
}