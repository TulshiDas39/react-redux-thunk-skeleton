import { ApiStorage } from "..";
import {ThunkArg } from "../types";

export class ThunkUtils {
  private static instance: ThunkUtils | undefined = undefined;

  static GetDefault(): ThunkUtils {
    if (ThunkUtils.instance === undefined) {
      ThunkUtils.instance = new ThunkUtils();
    }
    return ThunkUtils.instance;
  }

  readonly ApiStorage = ApiStorage;

  private constructor() {}

  isOperation<T>(param: ThunkArg){
    return (
      !!param && !!param.isLocal
    );
  }

  isOperationArray(param: any) {
    return (
      !!param &&
      Array.isArray(param) &&
      (param as any[]).every(this.isOperation)
    );
  }
}
