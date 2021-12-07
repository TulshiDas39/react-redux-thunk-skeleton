import {
  AsyncThunk,
  createReducer,
  createAsyncThunk,
  Reducer,
} from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ApiStorage } from "..";
import { IApiResponseModel, ThunkState } from "..";
import { Utility } from "../../lib/utility";
import { ThunkArg } from "../types";

function GetActionTypeWithoutCase(type: string): string {
  const _types = type.split("/");
  return _types.slice(0, _types.length - 1).join("/");
}

export function CreateReducerFromThunk<
  TResponse = any,
  TError = any,
  Param = any
>(
  thunk: AsyncThunk<IApiResponseModel<TResponse, TError>, Param, {}>
): Reducer<ThunkState<TResponse, TError>, AnyAction> {
  return createReducer<ThunkState<any, any>>(
    { uid: Utility.UtilUUID.Generate(), isBusy: false, version: 0, reqCount: 0 },
    (builder) => {
      const _thunk: ReturnType<typeof createAsyncThunk> = thunk as any;
      builder.addCase(_thunk.pending, (state, action) => {
        if (!!action && !!action.meta && !!action.meta.arg) {          
            const arg: ThunkArg<any> = action.meta.arg as any;
            if (arg.isLocal) {
              return state;
            }          
        }
        const reqCount = state.reqCount + 1;
        const isBusy = reqCount > 0;
        return { ...state, isBusy, reqCount,propgressPercent:0 };
      });

      builder.addCase(_thunk.fulfilled, (state, action) => {
        let payload = action.payload as IApiResponseModel<any, any>;
        if (!payload.error) {
          ApiStorage.setResponse(
            state.uid,
            GetActionTypeWithoutCase(action.type),
            payload.response as object
          );
        }
        const { response, ...rest } = payload;
        payload = { ...rest };
        const version = state.version + 1;
        if (!!action && !!action.meta && !!action.meta.arg) {          
            const arg: ThunkArg<any> = action.meta.arg as any;
            if (arg.isLocal) {
              return { ...state, ...(payload as any), version };
            }          
        }
        if (state.reqCount === 0) {
          return state;
        }
        const reqCount = state.reqCount - 1;
        const isBusy = reqCount > 0;
        return { ...state, ...(payload as any), version, isBusy, reqCount };
      });
      builder.addCase(_thunk.rejected, (state, action) => {
        const version: number = state.version + 1;
        if (!!action && !!action.meta && !!action.meta.arg) {          
            const arg: ThunkArg<any> = action.meta.arg as any;
            if (arg.isLocal) {
              return { ...state, ...(action.payload as any), version };
            }          
        }
        if (state.reqCount === 0) {
          return state;
        }
        const reqCount = state.reqCount - 1;
        const isBusy = reqCount > 0;
        return {
          ...state,
          ...(action.payload as any),
          version,
          isBusy,
          reqCount,
          propgressPercent:0,
        };
      });
    }
  );
}
