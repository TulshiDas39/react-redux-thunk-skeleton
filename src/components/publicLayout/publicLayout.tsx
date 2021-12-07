import React from "react";
import { Route, Switch } from "react-router";
import { Login } from "..";
import { UiRoutes } from "../../config/UIRoutes";

function PublicLayoutComponent(){
    return <Switch>
        <Route exact path={UiRoutes.Login} component={Login}  />
    </Switch>
}

export const PublicLayout = React.memo(PublicLayoutComponent);