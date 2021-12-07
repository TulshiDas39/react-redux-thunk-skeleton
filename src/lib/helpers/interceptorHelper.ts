import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AppStorage } from "..";
import { UiRoutes } from "../../config/UIRoutes";
import { IApiErrorModel, IApiResponseModel, IRequestConfig } from "../../core";

export class InterceptHelper {
    static defaultRequestConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    static getRequestConfig = (config?:IRequestConfig):AxiosRequestConfig => {
        let token = AppStorage.getAccessToken();
        const requestConfig:AxiosRequestConfig={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        if(config){
            if(config.contentType) requestConfig.headers!['Content-Type'] = config.contentType;
        }
        return requestConfig;
    }

    static handleHttpResponse(res:AxiosResponse){
        const response:IApiResponseModel={
            response:res.data,
            statusCode:res.status,
        }
        return response;
    }

    static handleHttpFailed(error?: AxiosResponse<{message:string}>) {
        let errorData:IApiErrorModel={
            error:error?.data,
            message:error?.data.message ||  "Request Failed",
        }

        if (error?.status === 401) {
            if (window.location.pathname !== UiRoutes.LoginDemo) {
                localStorage.clear();
                window.location.pathname = UiRoutes.LoginDemo;
            }
        }
        const response:IApiResponseModel={
            error:errorData,
            statusCode:error?.status,
        }
        return response;
    }

    static isValidEmail(email: string) {
        return (/^\w+([.-\\+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
    }

    static allEmptyProperty(data: { [key: string]: any }) {

        return Object.keys(data).every((k) => !data[k])
    }

    static capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

}