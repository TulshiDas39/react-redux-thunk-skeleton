import { AccountInfo } from "@azure/msal-browser";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react"
import { Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router";
import { UiRoutes } from "../../config/UIRoutes";
import { ApiLogin, IdTokenClaims, ThunkLogin, useDispatchTyped } from "../../core";
import { AppStorage, AzureAuthenticationContext, useMultiState } from "../../lib"

interface IState{
    isBusy:boolean;
    userName:string;
    password:string
}

function LoginComponent(){
    const [state,setState]=useMultiState<IState>({isBusy:false,password:"",userName:""});
    const dispatch = useDispatchTyped();
    const history = useHistory();
    if(!!AppStorage.getAccessToken()) return <Redirect to={UiRoutes.Root} />    

      
    const logIn = () => {
        dispatch(ThunkLogin({arg:{apiData:{password:state.password,userName:state.userName}}})).then(unwrapResult).then(res=>{
            if(res.response) {
                AppStorage.setAccessToken(res.response.token);
                AppStorage.setUserInfo(res.response);
                history.push(UiRoutes.Root);
            }
        })
    };

    return <div className="text-center">
        {state.isBusy && <div>Singing...</div>}
        <Form.Control type="text" placeholder="Enter username" 
            onChange={e=>setState({userName:e.target.value})} 
            value={state.userName} />
        <Form.Control type="password" placeholder="Enter password" 
            onChange={e=> setState({password:e.target.value})} value={state.password} />
        <button className="text-center" onClick={logIn} disabled={state.isBusy}>Login</button>
    </div>
}

export const Login = React.memo(LoginComponent)



// const x = {
//     "homeAccountId": "9a5a56f6-45cb-4c1f-813b-8c0ba4c53faa.0a495c7a-8a56-41c6-bf09-f14ccaf97dfe",
//     "environment": "login.windows.net",
//     "tenantId": "0a495c7a-8a56-41c6-bf09-f14ccaf97dfe",
//     "username": "tulshi@hannanhossainoutlook.onmicrosoft.com",
//     "localAccountId": "9a5a56f6-45cb-4c1f-813b-8c0ba4c53faa",
//     "name": "Tulshi Das",
//     "idTokenClaims": {
//         "aud": "72b689ad-a65f-4426-adc9-62c1444690f1",
//         "iss": "https://login.microsoftonline.com/0a495c7a-8a56-41c6-bf09-f14ccaf97dfe/v2.0",
//         "iat": 1634900971,
//         "nbf": 1634900971,
//         "exp": 1634904871,
//         "aio": "ATQAy/8TAAAATdJ4ik3uyLzCvOAUJyMKz+IOt/quL9He85BYtIUC1arqJLhIc64S6M+vy91XbiRi",
//         "name": "Tulshi Das",
//         "nonce": "df4774e0-7ec6-40da-9548-661c2a3d024f",
//         "oid": "9a5a56f6-45cb-4c1f-813b-8c0ba4c53faa",
//         "preferred_username": "tulshi@hannanhossainoutlook.onmicrosoft.com",
//         "rh": "0.AVMAelxJClaKxkG_CfFMyvl9_q2JtnJfpiZErcliwURGkPFTACA.",
//         "sub": "nzqNfXIuTWGdkDTcMdPrRg18nFprGevDVBqanXWDMZE",
//         "tid": "0a495c7a-8a56-41c6-bf09-f14ccaf97dfe",
//         "uti": "G8pduu-p1061ZZBBSaMjAQ",
//         "ver": "2.0"
//     }
// }
