import React from "react";
import { Route, Redirect } from "react-router-dom";
import { allAppComponentsWithPageTitle } from "../data/consts";

export const PublicRoute = ({ authenticated, ...rest }) => {
    return (
        (
            !authenticated
        ) ? (
            <Route {...rest} />
        ) : (
            <Redirect to={allAppComponentsWithPageTitle.messenger.path} />
        )
    )
};
