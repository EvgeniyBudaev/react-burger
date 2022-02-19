import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import cn from "classnames";
import { CustomLink } from "components";
import { useDispatch, useSelector } from "hooks";
import { ROUTES } from "routes";
import { logout } from "services/account";
import { accountSelector } from "services/selectors";
import { Spinner } from "ui-kit";
import classes from "./profile-navigation.module.css";

export const ProfileNavigation: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { pathname } = useLocation();
    const { logoutRequest: isLogoutLoading } = useSelector(accountSelector);

    const goLogin = () => {
        history.push(ROUTES.LOGIN);
    };

    const handleLogout = () => {
        dispatch(logout(goLogin));
    };

    if (isLogoutLoading) return <Spinner />;

    return (
        <section className={classes.ProfileNavigation}>
            <nav className={cn("mr-15 mb-20", classes.MenuPanel)}>
                <CustomLink
                    className={classes.MenuPanelItem}
                    routeTo={ROUTES.PROFILE}
                    title="Профиль"
                />
                <CustomLink
                    className={classes.MenuPanelItem}
                    routeTo="/profile/orders"
                    title="История заказов"
                />
                <div className={classes.Logout} onClick={handleLogout}>
                    <p
                        className={cn(
                            "text text_type_main-medium text_color_inactive",
                            classes.LogoutText
                        )}
                    >
                        Выход
                    </p>
                </div>
            </nav>
            {pathname === ROUTES.PROFILE && (
                <p
                    className={`text text_type_main-default text_color_inactive`}
                >
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            )}
            {pathname === `${ROUTES.PROFILE}${ROUTES.ORDERS}` && (
                <p
                    className={`text text_type_main-default text_color_inactive`}
                >
                    В этом разделе вы можете просмотреть свою историю заказов
                </p>
            )}
        </section>
    );
};
