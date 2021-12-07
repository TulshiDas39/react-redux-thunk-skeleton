import { ApiLogin, ApiGetUser, IApiLoginResponse, IApiResponseModel } from "../..";
import { CreateExtendedThunkSlice } from "../createThunkSlice";

interface IParams{
  apiData?:{
    userName?:string;
    password?:string;
  }  
  localData?:IApiLoginResponse
}

export const ThunkLogin = CreateExtendedThunkSlice<
  IApiLoginResponse,
  IParams
>("api/login", async (param, thunkApi):Promise<IApiResponseModel<IApiLoginResponse>> => {
    if(param.isLocal) {
      const state = thunkApi.getState().api.login;
      return {...state,response:param.arg.localData!};
    }
    if(!param.arg.apiData) throw "no api data";
    return ApiLogin(param.arg.apiData.userName!,param.arg.apiData.password!);
});
