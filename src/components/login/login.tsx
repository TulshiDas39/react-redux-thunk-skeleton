import { unwrapResult } from "@reduxjs/toolkit";
import React from "react"
import { Button, Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router";
import { UiRoutes } from "../../config/UIRoutes";
import { ThunkLogin, useDispatchTyped } from "../../core";
import { AppStorage, useMultiState } from "../../lib"

interface IState{
    isBusy:boolean;
    userName:string;
    password:string
}

function LoginComponent(){
    const [state,setState]=useMultiState<IState>({isBusy:false,password:"cityslicka",userName:"eve.holt@reqres.in"});
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

    return <div className="text-center d-flex justify-content-center align-items-center h-100">
        <div className="w-25">
            {state.isBusy && <div>Singing...</div>}
            <div className="py-1">
                <div>
                    <h1 className="text-info">React Skeleton</h1>
                </div>
                <Form.Control type="text" placeholder="Enter username"
                    onChange={e=>setState({userName:e.target.value})} 
                    value={state.userName} />
            </div>
            <div className="py-1">
                <Form.Control type="password" placeholder="Enter password" 
                    onChange={e=> setState({password:e.target.value})} value={state.password} />
            </div>
            
            <Button className="text-center" onClick={logIn} disabled={state.isBusy}>Login</Button>
        </div>        
    </div>
}

export const Login = React.memo(LoginComponent)
