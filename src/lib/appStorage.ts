import { IApiLoginResponse, IUserInfo } from "../core";

export class AppStorage {
  private static ACCESS_TOKEN: string = "ACCESS_TOKEN";
  private static USER_INFO = "USER_INFO";
  
  static setAccessToken(token: string): void {
    localStorage.setItem(AppStorage.ACCESS_TOKEN, token);
  }

  static getAccessToken(): string {
    return localStorage.getItem(AppStorage.ACCESS_TOKEN) || "";
  }

  static isUserAuthorized(): boolean {
    return !!AppStorage.getAccessToken();
  }

  static LoginOff(): void {
    localStorage.removeItem(AppStorage.ACCESS_TOKEN);
  }

  static setUserInfo(userInfo: IApiLoginResponse) {
    localStorage.setItem(AppStorage.USER_INFO, JSON.stringify(userInfo));
  }

  static getUserInfo(): IApiLoginResponse {
    return JSON.parse(localStorage.getItem(AppStorage.USER_INFO) as string);
  }

  static clearUserInfo() {
    localStorage.removeItem(AppStorage.USER_INFO);
  }

}
