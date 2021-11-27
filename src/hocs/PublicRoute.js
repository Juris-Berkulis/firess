import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ authenticated, ...rest }) => {
    return (
        (
            !authenticated
        ) ? (
            <Route {...rest} />
        ) : (
            <Redirect to="/messenger" />
        )
    )
};
