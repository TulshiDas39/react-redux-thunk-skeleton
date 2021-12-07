import Axios, { AxiosRequestConfig } from "axios";
import { IApiResponseModel } from "..";
import { InterceptHelper } from "../../lib";

export class Intercept{
    static get<T=any,E=any>(url:string,config?:AxiosRequestConfig):Promise<IApiResponseModel<T,E>>{
        config = config || InterceptHelper.getAuthorizedRequestConfig();
        return Axios.get<T>(url, config).then(response => InterceptHelper.handleHttpResponse(response))
            .catch(err =>  InterceptHelper.handleHttpFailed(err.response));
    }

    static post<T=any,E=any>(url:string,data:any,config?:AxiosRequestConfig):Promise<IApiResponseModel<T,E>>{
        config = config || InterceptHelper.getAuthorizedRequestConfig();
        return Axios.post<T>(url, data,config).then(response => InterceptHelper.handleHttpResponse(response))
            .catch(err=>InterceptHelper.handleHttpFailed(err.response));
    }

    static put<T=any,E=any>(url:string,data:any,config?:AxiosRequestConfig):Promise<IApiResponseModel<T,E>>{
        config = config || InterceptHelper.getAuthorizedRequestConfig();
        return Axios.put<T>(url, data,config).then(response => InterceptHelper.handleHttpResponse(response))
            .catch(err => InterceptHelper.handleHttpFailed(err.response));
    }

    static delete<T=any,E=any>(url:string,config?:AxiosRequestConfig):Promise<IApiResponseModel<T,E>>{
        config = config || InterceptHelper.getAuthorizedRequestConfig();
        return Axios.delete<T>(url, config).then(response => InterceptHelper.handleHttpResponse(response))
            .catch(err => InterceptHelper.handleHttpFailed(err.response));
    }
}