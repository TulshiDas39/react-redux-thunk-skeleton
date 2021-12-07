import React, { useEffect } from "react"
import { Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router";
import { UiRoutes } from "../../config/UIRoutes";
import { ThunkGetUser, useDispatchTyped } from "../../core";
import { AppStorage, useSelectorApi } from "../../lib";

function HomeComponent(){
    const dispatch = useDispatchTyped();
    const history = useHistory();
    useEffect(()=>{
        dispatch(ThunkGetUser({arg:{userId:"2"}}));
    },[])
    const userData = useSelectorApi("user");
    if(userData.isBusy) return <p className="text-center">Loading...</p>
    const user = userData.response?.data;
    const handleLogout = ()=>{
        localStorage.clear();
        history.push(UiRoutes.Root);
    }
    if(!AppStorage.getAccessToken()) return <Redirect to={UiRoutes.Login} />
    return <div className="h-100 d-flex justify-content-center align-items-center">
        {!!user && <div>
            <div>
                <img src={user.avatar} alt="profile-image" />
            </div>
            <p>Name: {user.first_name} {user.last_name}</p>    
            <p>Email: {user.email}</p>            
            
            <div className="text-center py-2">
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>}
    </div>
}

export const Home = React.memo(HomeComponent);