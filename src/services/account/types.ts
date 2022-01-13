import { AxiosError } from "axios";
import { ActionTypes } from "services/account";

export interface IUser {
    email: string;
    name: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: IUser;
}

export interface IRegisterRequest {
    email: string;
    name: string;
    password: string;
}

export interface IRegisterResponse {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: IUser;
}

export interface IForgotPasswordRequest {
    email: string;
}

export interface IForgotPasswordResponse {
    message: string;
    success: boolean;
}

export interface IResetPasswordRequest {
    password: string;
    token: string;
}

export interface IResetPasswordResponse {
    message: string;
    success: boolean;
}

export interface ILogoutResponse {
    message: string;
    success: boolean;
}

export interface IActionLoginRequest {
    type: ActionTypes.LOGIN_USER_REQUEST;
}

export interface IActionLoginSuccess {
    type: ActionTypes.LOGIN_USER_SUCCESS;
    payload: IRegisterResponse;
}

export interface IActionLoginFailed {
    type: ActionTypes.LOGIN_USER_FAILED;
    payload: AxiosError;
}

export interface IActionRegisterRequest {
    type: ActionTypes.REGISTER_USER_REQUEST;
}

export interface IActionRegisterSuccess {
    type: ActionTypes.REGISTER_USER_SUCCESS;
    payload: IRegisterResponse;
}

export interface IActionRegisterFailed {
    type: ActionTypes.REGISTER_USER_FAILED;
    payload: AxiosError;
}

export interface IActionForgotPasswordRequest {
    type: ActionTypes.FORGOT_PASSWORD_REQUEST;
}

export interface IActionForgotPasswordSuccess {
    type: ActionTypes.FORGOT_PASSWORD_SUCCESS;
}

export interface IActionForgotPasswordFailed {
    type: ActionTypes.FORGOT_PASSWORD_FAILED;
    payload: AxiosError;
}

export interface IActionResetPasswordRequest {
    type: ActionTypes.RESET_PASSWORD_REQUEST;
}

export interface IActionResetPasswordSuccess {
    type: ActionTypes.RESET_PASSWORD_SUCCESS;
}

export interface IActionResetPasswordFailed {
    type: ActionTypes.RESET_PASSWORD_FAILED;
    payload: AxiosError;
}

export interface IActionLogoutRequest {
    type: ActionTypes.LOGOUT_USER_REQUEST;
}

export interface IActionLogoutSuccess {
    type: ActionTypes.LOGOUT_USER_SUCCESS;
}

export interface IActionLogoutFailed {
    type: ActionTypes.LOGOUT_USER_FAILED;
    payload: AxiosError;
}

export type AccountActionsType =
    | IActionLoginRequest
    | IActionLoginSuccess
    | IActionLoginFailed
    | IActionRegisterRequest
    | IActionRegisterSuccess
    | IActionRegisterFailed
    | IActionForgotPasswordRequest
    | IActionForgotPasswordSuccess
    | IActionForgotPasswordFailed
    | IActionResetPasswordRequest
    | IActionResetPasswordSuccess
    | IActionResetPasswordFailed
    | IActionLogoutRequest
    | IActionLogoutSuccess
    | IActionLogoutFailed;
