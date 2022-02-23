import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useDispatch, useSelector } from "hooks";
import { ROUTES } from "routes";
import { getNewAccessToken } from "services/account";
import { accountSelector } from "services/selectors";

export const ProtectedRoute: React.FC<RouteProps> = ({
    children,
    ...rest
}): JSX.Element => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector(accountSelector);
    const refreshToken = Boolean(localStorage.getItem("refreshToken"));

    useEffect(() => {
        if (refreshToken) {
            dispatch(getNewAccessToken());
        }
    }, [dispatch, refreshToken]);

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
