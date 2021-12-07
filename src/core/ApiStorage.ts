import { ThunkState } from "../core/types";

class ApiStorageImpl {
  private _objects: {
    [key: string]: { res: object; actionType: string } | undefined;
  } = {};

  private _storeReferenceToWindow(): void {
    (window as any).apiStorage = this._objects;
  }

  constructor() {
    this._storeReferenceToWindow();
  }

  setResponse(key: string, actionType: string, res: object): void {
    if (!key) return;
    if (!res) {
      this._objects[key] = undefined;
    } else {
      this._objects[key] = {
        actionType,
        res,
      };
    }
  }

  getResponse<R, E>(api: ThunkState<R, E>): R | undefined {
    return this._objects[api.uid]?.res as unknown as R;
  }

  clearAllResponse(): void {
    this._objects = {};
    this._storeReferenceToWindow();
  }
}

export const ApiStorage = new ApiStorageImpl();
