import React, { useEffect } from "react"
import { Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router";
import { UiRoutes } from "../../config/UIRoutes";
import { ThunkGetUsers, useDispatchTyped } from "../../core";
import { AppStorage, useSelectorApi } from "../../lib";

function HomeComponent(){
    const dispatch = useDispatchTyped();
    const history = useHistory();
    useEffect(()=>{
        dispatch(ThunkGetUsers({arg:{userId:"2"}}));
    },[])
    const userData = useSelectorApi("login");
    if(userData.isBusy) return <p>Loading...</p>
    const user = userData.response;
    const handleLogout = ()=>{
        localStorage.clear();
        history.push(UiRoutes.Root);
    }
    if(!AppStorage.getAccessToken()) return <Redirect to={UiRoutes.Login} />
    return <div>
        {!!user && <div>
            <p>Name: {user.userName}</p>    
            <p>Email: {user.userName}</p>                
            
            <Button onClick={handleLogout}>Logout</Button>
        </div>}
    </div>
}

export const Home = React.memo(HomeComponent);