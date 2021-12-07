import Axios, { AxiosRequestConfig } from "axios";
import { IApiResponseModel, IRequestConfig } from "..";
import { InterceptHelper } from "../../lib";

export class Intercept{
    static get<T=any,E=any>(url:string,config?:IRequestConfig):Promise<IApiResponseModel<T,E>>{
        let requestConfig:AxiosRequestConfig = InterceptHelper.getRequestConfig(config);
        return Axios.get<T>(url, requestConfig).then(response => InterceptHelper.handleHttpResponse(response))
            .catch(err =>  InterceptHelper.handleHttpFailed(err.response));
    }

    static post<T=any,E=any>(url:string,data:any,config?:IRequestConfig):Promise<IApiResponseModel<T,E>>{
        let requestConfig:AxiosRequestConfig = InterceptHelper.getRequestConfig(config);
        return Axios.post<T>(url, data,requestConfig).then(response => InterceptHelper.handleHttpResponse(response))
            .catch(err=>InterceptHelper.handleHttpFailed(err.response));
    }

    static put<T=any,E=any>(url:string,data:any,config?:IRequestConfig):Promise<IApiResponseModel<T,E>>{
        let requestConfig:AxiosRequestConfig = InterceptHelper.getRequestConfig(config);
        return Axios.put<T>(url, data,requestConfig).then(response => InterceptHelper.handleHttpResponse(response))
            .catch(err => InterceptHelper.handleHttpFailed(err.response));
    }

    static delete<T=any,E=any>(url:string,config?:IRequestConfig):Promise<IApiResponseModel<T,E>>{
        let requestConfig:AxiosRequestConfig = InterceptHelper.getRequestConfig(config);
        return Axios.delete<T>(url, requestConfig).then(response => InterceptHelper.handleHttpResponse(response))
            .catch(err => InterceptHelper.handleHttpFailed(err.response));
    }
}