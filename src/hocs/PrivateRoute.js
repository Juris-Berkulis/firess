import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ authenticated, ...rest }) => {
    return (
        (
            authenticated
        ) ? (
            <Route {...rest} />
        ) : (
            // <Redirect to={{ pathname: "/login" }} />
            <Redirect to='/login' />
        )
    )
};
