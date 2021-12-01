import React from "react";
import { Route, Redirect } from "react-router-dom";
import { allAppComponentsWithPageTitle } from "../data/consts";

export const PrivateRoute = ({ authenticated, ...rest }) => {
    return (
        (
            authenticated
        ) ? (
            <Route {...rest} />
        ) : (
            <Redirect to={allAppComponentsWithPageTitle.login.path} />
        )
    )
};
