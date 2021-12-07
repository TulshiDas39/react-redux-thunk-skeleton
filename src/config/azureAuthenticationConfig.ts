import { Configuration, LogLevel } from "@azure/msal-browser";

const AzureActiveDirectoryAppClientId = process.env.REACT_APP_AD_CLIENT_ID as string;

export const MSAL_CONFIG: Configuration = {
  auth: {
    clientId: AzureActiveDirectoryAppClientId,
    redirectUri:document.getElementsByTagName('base')[0].href,
    authority:'https://login.microsoftonline.com/0a495c7a-8a56-41c6-bf09-f14ccaf97dfe/',
    postLogoutRedirectUri: document.getElementsByTagName('base')[0].href,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
  
};