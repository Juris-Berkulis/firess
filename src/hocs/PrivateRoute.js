import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ authenticated, ...rest }) {
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
