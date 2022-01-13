import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ROUTES } from "routes";

export const ProtectedRoute = ({ children, ...rest }) => {
    const { accessToken } = useTypedSelector(state => state.account);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                accessToken ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTES.LOGIN,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
