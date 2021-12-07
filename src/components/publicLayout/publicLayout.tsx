import React from "react";
import { Route, Switch } from "react-router";
import { LoginDemo } from "..";
import { UiRoutes } from "../../config/UIRoutes";

function PublicLayoutComponent(){
    return <Switch>
        <Route exact path={UiRoutes.LoginDemo} component={LoginDemo}  />
    </Switch>
}

export const PublicLayout = React.memo(PublicLayoutComponent);