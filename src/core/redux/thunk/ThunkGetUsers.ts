import { ApiUsers, IApiResponseModel, IUserInfo, ThunkResponse } from "../..";
import { CreateExtendedThunkSlice } from "../createThunkSlice";

interface IParams{
  userId?:string;
  user?:IUserInfo;
}

export const ThunkGetUsers = CreateExtendedThunkSlice<
  any,
  IParams
>("api/GetUsers", async (param, thunkApi):Promise<IApiResponseModel<any>> => {
    if(param.isLocal) {
      const state = thunkApi.getState().api.users;
      return {...state,response:{data: param.arg.user!}};
    }
    return ApiUsers(param.arg.userId!);
});
