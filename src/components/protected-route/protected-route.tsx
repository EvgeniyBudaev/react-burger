import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ROUTES } from "routes";

export const ProtectedRoute: React.FC<RouteProps> = ({
    children,
    ...rest
}): JSX.Element => {
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
