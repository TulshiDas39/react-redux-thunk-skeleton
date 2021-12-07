import { ApiGetUser, IApiResponseModel, IGetUserResponse, IUserInfo } from "../..";
import { CreateExtendedThunkSlice } from "../createThunkSlice";

interface IParams{
  userId?:string;
  user?:IUserInfo;
}

export const ThunkGetUser = CreateExtendedThunkSlice<
  IGetUserResponse,
  IParams
>("api/GetUser", async (param, thunkApi):Promise<IApiResponseModel<IGetUserResponse>> => {
    if(param.isLocal) {
      const state = thunkApi.getState().api.user;
      return {...state,response: { data: param.arg.user!}};
    }
    return ApiGetUser(param.arg.userId!);
});
