import { CancelTokenSource } from "axios";

export type ThunkCancelTokenStorageBindData = {
  key: string;
  requestId: string;
};

export class ThunkRequestControl {
  private static instance: ThunkRequestControl | null = null;

  private cancelTokenStorage: {
    [key: string]:
      | { requestId: string; token: CancelTokenSource }[]
      | undefined;
  } = {};

  public static GetDefault(): ThunkRequestControl {
    if (ThunkRequestControl.instance === null) {
      ThunkRequestControl.instance = new ThunkRequestControl();
    }
    return ThunkRequestControl.instance;
  }

  AddCancelToken(
    key: string,
    requestId: string,
    token: CancelTokenSource,
    inclusiveLimit: number
  ): void {
    const data = this.cancelTokenStorage[key] ?? [];
    if (data.length === inclusiveLimit) {
      const [first, ...rest] = data;
      first.token.cancel();
      this.cancelTokenStorage[key] = [...rest, { requestId, token }];
    } else {
      data.push({ requestId, token });
      this.cancelTokenStorage[key] = data;
    }
  }

  RemoveCancelToken(data?: ThunkCancelTokenStorageBindData): void {
    if (data) {
      const requestData = this.cancelTokenStorage[data.key] ?? [];
      this.cancelTokenStorage[data.key] = requestData.filter(
        (r) => r.requestId !== data.requestId
      );
    } else {
      this.cancelTokenStorage = {};
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}
