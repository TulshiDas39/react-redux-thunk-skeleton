import { IApiResponseModel } from ".";

export interface ThunkResponse<R,E=any> extends Promise<IApiResponseModel<R,E>>{
    
}