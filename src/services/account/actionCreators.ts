import { BASE_URL } from "constants/routes";
import axios from "axios";
import {
    ActionTypes,
    IForgotPasswordRequest,
    IForgotPasswordResponse,
    ILoginRequest,
    ILoginResponse,
    IRegisterRequest,
    IRegisterResponse,
} from "services/account";
import { setCookie, getCookie } from "utils/coockie";

const LOGIN_URL = `${BASE_URL}auth/login`;
const REGISTER_URL = `${BASE_URL}auth/register`;
const FORGOT_PASSWORD_URL = `${BASE_URL}password-reset`;
const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const login =
    ({ email, password }: ILoginRequest): ((dispatch) => Promise<void>) =>
    async dispatch => {
        const body = JSON.stringify({
            email,
            password,
        });
        try {
            dispatch({ type: ActionTypes.LOGIN_USER_REQUEST });
            const { data } = await axios.post<ILoginResponse>(
                LOGIN_URL,
                body,
                config
            );
            dispatch({
                type: ActionTypes.LOGIN_USER_SUCCESS,
                payload: data,
            });
            setCookie("accessToken", data.accessToken, {});
            setCookie("refreshToken", data.refreshToken, {});
        } catch (error) {
            dispatch({
                type: ActionTypes.LOGIN_USER_FAILED,
                payload: error,
            });
        }
    };

export const register =
    ({
        email,
        name,
        password,
    }: IRegisterRequest): ((dispatch) => Promise<void>) =>
    async dispatch => {
        const body = JSON.stringify({
            email,
            name,
            password,
        });
        try {
            dispatch({ type: ActionTypes.REGISTER_USER_REQUEST });
            const { data } = await axios.post<IRegisterResponse>(
                REGISTER_URL,
                body,
                config
            );
            dispatch({
                type: ActionTypes.REGISTER_USER_SUCCESS,
                payload: data,
            });
            setCookie("accessToken", data.accessToken, {});
            setCookie("refreshToken", data.refreshToken, {});
        } catch (error) {
            dispatch({
                type: ActionTypes.REGISTER_USER_FAILED,
                payload: error,
            });
        }
    };

export const forgotPassword =
    ({ email }: IForgotPasswordRequest): ((dispatch) => Promise<void>) =>
    async dispatch => {
        const body = JSON.stringify({
            email,
        });
        try {
            dispatch({ type: ActionTypes.FORGOT_PASSWORD_REQUEST });
            await axios.post<IForgotPasswordResponse>(
                FORGOT_PASSWORD_URL,
                body,
                config
            );
            dispatch({
                type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.FORGOT_PASSWORD_FAILED,
                payload: error,
            });
        }
    };
