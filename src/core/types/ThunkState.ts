import { IApiResponseModel } from ".";

export type ThunkState<TData, TError> = {
  uid: string,
  isBusy: boolean,
  reqCount: number,
  version: number,
  cached?: boolean,
} & IApiResponseModel<TData, TError>;