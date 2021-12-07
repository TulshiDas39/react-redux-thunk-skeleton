import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { UiRoutes } from "../../config/UIRoutes";
import {Home} from '..'

import { AppStorage } from "../../lib";


function PrivateLayoutComponent(): JSX.Element {
  
    if (!AppStorage.getAccessToken()) {    
        return (
            <Redirect to={{ pathname: UiRoutes.Login }} />
        );
    }
    return (
        <Switch>
            <Route exact path={UiRoutes.Root} component={Home} />
        </Switch>
    );
}

export const PrivateLayout = React.memo(PrivateLayoutComponent);
