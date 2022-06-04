import { ApiLoginDemo, IApiLoginResponse, IApiResponseModel } from "../..";
import { ApiStorage } from "../../ApiStorage";
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
>("api/loginDemo", async (param, thunkApi):Promise<IApiResponseModel<IApiLoginResponse>> => {
    if(param.isLocal) {
      const state = ApiStorage.getResponse(thunkApi.getState().api.login);
      return {...state,response:param.arg.localData!};
    }
    if(!param.arg.apiData) throw "no api data";
    return ApiLoginDemo(param.arg.apiData.userName!,param.arg.apiData.password!);
});
