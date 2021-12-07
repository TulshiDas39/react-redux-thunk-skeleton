import {
    PublicClientApplication,
    AuthenticationResult,
    AccountInfo,
    EndSessionRequest,
    RedirectRequest,
    PopupRequest,
    EventType,
  } from "@azure/msal-browser";
  
  import { MSAL_CONFIG } from "../../config";
  
  export class AzureAuthenticationContext {
    private myMSALObj: PublicClientApplication = new PublicClientApplication(
      MSAL_CONFIG
    );
    private account?: AccountInfo;
    private loginRedirectRequest?: RedirectRequest;
    private loginRequest?: PopupRequest;
  
    public isAuthenticationConfigured = false;
  
    constructor() {
      // @ts-ignore
      this.account = null;
      this.setRequestObjects();
      if (MSAL_CONFIG?.auth?.clientId) {
        this.isAuthenticationConfigured = true;
      }
    }
  
    private setRequestObjects(): void {
      this.loginRequest = {
        scopes: [],
        prompt: "select_account",
      };
  
      this.loginRedirectRequest = {
        ...this.loginRequest,
        redirectStartPage: window.location.href,
      };
    }
  
    login(signInType: string) {
      // return new Promise<AccountInfo>((resolve,reject)=>{
      //   // if (signInType === "loginPopup") {
      //   //   this.myMSALObj
      //   //     .loginPopup(this.loginRequest)
      //   //     .then((resp: AuthenticationResult) => {
      //   //       let account = this.handleResponse(resp);
      //   //       if(account) resolve(account);
      //   //       else reject("Authentication failed");
      //   //     })
      //   //     .catch((err) => {
      //   //       reject(err);
      //   //     });
      //   // } 
          
        
      // }) 
      const accounts = this.myMSALObj.getAllAccounts();
      if(accounts.length > 0) this.myMSALObj.setActiveAccount(accounts[0]);
      this.myMSALObj.addEventCallback((e)=>{
        //if(e.eventType === EventType.LOGIN_SUCCESS && e.payload.){}
      })
      this.myMSALObj.loginRedirect(this.loginRedirectRequest);    
    }
  
    logout(account: AccountInfo): void {
      const logOutRequest: EndSessionRequest = {
        account,
      };
  
      this.myMSALObj.logout(logOutRequest);
    }
    handleResponse(response: AuthenticationResult) {
      if(response !==null && response.account !==null) {
        this.account = response.account;
      } else {
        this.account = this.getAccount(response.account?.username!);
      }
  
      if (this.account) {
        return this.account;
      }
    }

    getAccessTokenSilent(email:string){
      return this.myMSALObj.acquireTokenSilent({
        scopes: ['user.read', 'User.ReadBasic.All'],
        account: this.getAccount(email),
      })
    }

    private getAccount(email:string): AccountInfo | undefined {
      console.log(`loadAuthModule`);
      const currentAccounts = this.myMSALObj.getAllAccounts();
      if (currentAccounts === null) {
        // @ts-ignore
        console.log("No accounts detected");
        return undefined;
      }
  
      if (currentAccounts.length > 1) {
        // TBD: Add choose account code here
        // @ts-ignore
        console.log(
          "Multiple accounts detected, need to add choose account code."
        );
        return currentAccounts?.find(x=>x.username === email);
      } else if (currentAccounts.length === 1) {
        return currentAccounts[0];
      }
    }
  }
  
  export default AzureAuthenticationContext;