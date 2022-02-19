import { BASE_URL } from "constants/routes";
import axios, { AxiosError } from "axios";
import {
    ActionTypes,
    IForgotPasswordRequest,
    IForgotPasswordResponse,
    IGetTokens,
    IGetUserResponse,
    ILoginRequest,
    ILoginResponse,
    ILogoutResponse,
    IRegisterRequest,
    IRegisterResponse,
    IResetPasswordRequest,
    IResetPasswordResponse,
    IUpdateUserRequest,
    IUpdateUserResponse,
} from "services/account";
import { AppDispatch, AppThunk, TFuncVoid } from "services/types";
import { setCookie, getCookie, deleteCookie } from "utils/coockie";
import { getErrorByStatus } from "utils/error";

const FORGOT_PASSWORD_URL = `${BASE_URL}password-reset`;
const GET_TOKEN_URL = `${BASE_URL}auth/token`;
const LOGIN_URL = `${BASE_URL}auth/login`;
const LOGOUT_URL = `${BASE_URL}auth/logout`;
const REGISTER_URL = `${BASE_URL}auth/register`;
const RESET_PASSWORD_URL = `${BASE_URL}password-reset/reset`;
const USER_URL = `${BASE_URL}auth/user`;

const config = {
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
};

export const getTokens = (response: IGetTokens): void => {
    const accessToken = response.accessToken.split("Bearer ")[1];
    const refreshToken = response.refreshToken;
    setCookie("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const signOut = (): void => {
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
};

export const getNewAccessToken: AppThunk =
    () => async (dispatch: AppDispatch) => {
        const body = JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        });
        try {
            dispatch({ type: ActionTypes.TOKEN_REQUEST });
            await axios.post(GET_TOKEN_URL, body, config);
            dispatch({ type: ActionTypes.TOKEN_SUCCESS });
        } catch (e) {
            const error = e as AxiosError;
            const errorByStatus = getErrorByStatus(error);
            const errorMessage = error.response && error.response.data.message;
            if (
                errorMessage === "jwt expired" ||
                errorMessage === "Token is invalid" ||
                errorMessage === "jwt malformed"
            ) {
                getNewAccessToken();
            } else {
                dispatch({
                    type: ActionTypes.TOKEN_ERROR,
                    payload: errorByStatus,
                });
            }
        }
    };

export const login: AppThunk =
    ({ email, password }: ILoginRequest) =>
    async (dispatch: AppDispatch) => {
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
            getTokens(data);
        } catch (e) {
            const error = e as AxiosError;
            const errorByStatus = getErrorByStatus(error);
            dispatch({
                type: ActionTypes.LOGIN_USER_FAILED,
                payload: errorByStatus,
            });
        }
    };

export const register: AppThunk =
    ({ email, name, password }: IRegisterRequest) =>
    async (dispatch: AppDispatch) => {
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
            getTokens(data);
        } catch (e) {
            const error = e as AxiosError;
            const errorByStatus = getErrorByStatus(error);
            dispatch({
                type: ActionTypes.REGISTER_USER_FAILED,
                payload: errorByStatus,
            });
        }
    };

export const forgotPassword: AppThunk =
    ({ email }: IForgotPasswordRequest) =>
    async (dispatch: AppDispatch) => {
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
        } catch (e) {
            const error = e as AxiosError;
            const errorByStatus = getErrorByStatus(error);
            dispatch({
                type: ActionTypes.FORGOT_PASSWORD_FAILED,
                payload: errorByStatus,
            });
        }
    };

export const resetPassword: AppThunk =
    ({ password, token }: IResetPasswordRequest) =>
    async (dispatch: AppDispatch) => {
        const body = JSON.stringify({
            password,
            token,
        });
        try {
            dispatch({ type: ActionTypes.RESET_PASSWORD_REQUEST });
            await axios.post<IResetPasswordResponse>(
                RESET_PASSWORD_URL,
                body,
                config
            );
            dispatch({
                type: ActionTypes.RESET_PASSWORD_SUCCESS,
            });
        } catch (e) {
            const error = e as AxiosError;
            const errorByStatus = getErrorByStatus(error);
            dispatch({
                type: ActionTypes.RESET_PASSWORD_FAILED,
                payload: errorByStatus,
            });
        }
    };

export const logout: AppThunk =
    (goLogin: TFuncVoid) => async (dispatch: AppDispatch) => {
        const body = JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        });
        try {
            dispatch({ type: ActionTypes.LOGOUT_USER_REQUEST });
            const response = await axios.post<ILogoutResponse>(
                LOGOUT_URL,
                body,
                config
            );
            dispatch({
                type: ActionTypes.LOGOUT_USER_SUCCESS,
            });
            if (response) {
                signOut();
                goLogin();
            }
        } catch (e) {
            const error = e as AxiosError;
            const errorByStatus = getErrorByStatus(error);
            dispatch({
                type: ActionTypes.LOGOUT_USER_FAILED,
                payload: errorByStatus,
            });
        }
    };

export const getUser: AppThunk = () => async (dispatch: AppDispatch) => {
    const token = getCookie("accessToken");
    if (token) {
        const configGetUser = {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        };
        try {
            dispatch({ type: ActionTypes.GET_USER_REQUEST });
            const { data } = await axios.get<IGetUserResponse>(
                USER_URL,
                configGetUser
            );
            dispatch({
                type: ActionTypes.GET_USER_SUCCESS,
                payload: data.user,
            });
        } catch (e) {
            const error = e as AxiosError;
            const errorByStatus = getErrorByStatus(error);
            dispatch({
                type: ActionTypes.GET_USER_FAILED,
                payload: errorByStatus,
            });
        }
    }
};

export const updateUser: AppThunk =
    ({ email, name, password }: IUpdateUserRequest) =>
    async (dispatch: AppDispatch) => {
        const body = JSON.stringify({
            email,
            name,
            password,
        });
        const token = getCookie("accessToken");
        if (token) {
            const configUpdateUser = {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            };
            try {
                dispatch({ type: ActionTypes.UPDATE_USER_REQUEST });
                const { data } = await axios.patch<IUpdateUserResponse>(
                    USER_URL,
                    body,
                    configUpdateUser
                );
                dispatch({
                    type: ActionTypes.UPDATE_USER_SUCCESS,
                    payload: data.user,
                });
            } catch (e) {
                const error = e as AxiosError;
                const errorByStatus = getErrorByStatus(error);
                if (
                    error.message === "jwt expired" ||
                    error.message === "Token is invalid" ||
                    error.message === "jwt malformed"
                ) {
                    getNewAccessToken();
                    updateUser({ name, email, password });
                }
                dispatch({
                    type: ActionTypes.UPDATE_USER_FAILED,
                    payload: errorByStatus,
                });
            }
        }
    };
