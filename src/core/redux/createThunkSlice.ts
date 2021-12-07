import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { CancelTokenSource } from "axios";
import { AppThunkApi } from "../ReduxStore";
import { IApiResponseModel, ThunkArg, ThunkResponse } from "../types";
import {
  ThunkCancelTokenStorageBindData,
  ThunkRequestControl,
} from "./requestControl";
import { ThunkUtils } from "./thunkUtils";

type ThunkConfig = {
  maxConnections?: number;
};

let GlobalAbortController = new AbortController();
let GlobalAxiosCancelToken: CancelTokenSource =
  CreateGlobalAxiosCancelToken().cancelToken;

type AppThunkApiExtended = Omit<AppThunkApi, "signal"> & {
  cancelToken: CancelTokenSource;
  utils: ThunkUtils;
};

 // IApiResponseModel<R>;

function CreateGlobalAxiosCancelToken(
  requestData?: ThunkCancelTokenStorageBindData
): {
  cancelToken: CancelTokenSource;
  canceler?: () => void;
  discardCancelToken: () => void;
} {
  const cancelToken = axios.CancelToken.source();

  const handleRequestControl = (): void => {
    ThunkRequestControl.GetDefault().RemoveCancelToken(requestData);
  };

  let canceler: (() => void) | undefined = (): void => {
    handleRequestControl();
    cancelToken.cancel();
    if (canceler)
      GlobalAbortController.signal.removeEventListener("abort", canceler);
    canceler = undefined;
  };
  const discardCancelToken = (): void => {
    handleRequestControl();
    if (canceler)
      GlobalAbortController.signal.removeEventListener("abort", canceler);
  };
  GlobalAbortController.signal.addEventListener("abort", canceler);
  return {
    cancelToken,
    canceler,
    discardCancelToken,
  };
}

export function CreateExtendedThunkSlice<R, P = any,E=any>(
  key: string,
  asyncFunc: (
    param: ThunkArg<P>,
    thunkApi: AppThunkApiExtended
  ) => ThunkResponse<R,E>,
  config?: ThunkConfig
): AsyncThunk<IApiResponseModel<R,E>, ThunkArg<P>, {}> {
  const extendedFunc: (
    param: ThunkArg<P>,
    thunkApi: AppThunkApi
  ) => ThunkResponse<R,E> = (param, thunkApi) => {
    const { cancelToken, canceler, discardCancelToken } =
      CreateGlobalAxiosCancelToken({
        key,
        requestId: thunkApi.requestId,
      });
    thunkApi.signal.onabort = canceler ?? null;
    const _thunkApi: AppThunkApiExtended = {
      ...thunkApi,
      cancelToken,
      utils: ThunkUtils.GetDefault(),
    };
    const requestLimit = Math.max(1, config?.maxConnections ?? 1);
    ThunkRequestControl.GetDefault().AddCancelToken(
      key,
      thunkApi.requestId,
      cancelToken,
      requestLimit
    );
    return asyncFunc(param, _thunkApi)
      .then((r) => {
        discardCancelToken();
        return r;
      })
      .catch((e) => {
        discardCancelToken();
        throw e;
      });
  };
  return createAsyncThunk<IApiResponseModel<R,E>, ThunkArg<P>, {}>(
    key,
    extendedFunc as (p: ThunkArg<P>) => ThunkResponse<R,E>
  );
}

function ExecGlobalAbort(): void {
  const tmp = GlobalAbortController;
  GlobalAbortController = new AbortController();
  GlobalAxiosCancelToken = CreateGlobalAxiosCancelToken().cancelToken;
  tmp.abort();
}

function GetGlobalAxiosCancelToken(): CancelTokenSource | undefined {
  return GlobalAxiosCancelToken;
}

export const GlobalAbortControl = {
  ExecGlobalAbort,
  GetGlobalAxiosCancelToken,
};
