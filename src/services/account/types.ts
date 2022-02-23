import { ActionTypes } from "services/account";
import { IError } from "types/error";

export type IGetTokens = {
    accessToken: string;
    refreshToken: string;
    success: boolean;
};

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

export interface IGetUserResponse {
    success: boolean;
    user: IUser;
}

export interface IUpdateUserRequest {
    email: string;
    name: string;
    password: string;
}

export interface IUpdateUserResponse {
    success: boolean;
    user: IUser;
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
    payload: IError;
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
    payload: IError;
}

export interface IActionForgotPasswordRequest {
    type: ActionTypes.FORGOT_PASSWORD_REQUEST;
}

export interface IActionForgotPasswordSuccess {
    type: ActionTypes.FORGOT_PASSWORD_SUCCESS;
}

export interface IActionForgotPasswordFailed {
    type: ActionTypes.FORGOT_PASSWORD_FAILED;
    payload: IError;
}

export interface IActionResetPasswordRequest {
    type: ActionTypes.RESET_PASSWORD_REQUEST;
}

export interface IActionResetPasswordSuccess {
    type: ActionTypes.RESET_PASSWORD_SUCCESS;
}

export interface IActionResetPasswordFailed {
    type: ActionTypes.RESET_PASSWORD_FAILED;
    payload: IError;
}

export interface IActionLogoutRequest {
    type: ActionTypes.LOGOUT_USER_REQUEST;
}

export interface IActionLogoutSuccess {
    type: ActionTypes.LOGOUT_USER_SUCCESS;
}

export interface IActionLogoutFailed {
    type: ActionTypes.LOGOUT_USER_FAILED;
    payload: IError;
}

export interface IActionGetUserRequest {
    type: ActionTypes.GET_USER_REQUEST;
}

export interface IActionGetUserSuccess {
    type: ActionTypes.GET_USER_SUCCESS;
    payload: IUser;
}

export interface IActionGetUserFailed {
    type: ActionTypes.GET_USER_FAILED;
    payload: IError;
}

export interface IActionTokenRequest {
    type: ActionTypes.TOKEN_REQUEST;
}

export interface IActionTokenSuccess {
    type: ActionTypes.TOKEN_SUCCESS;
}

export interface IActionTokenError {
    type: ActionTypes.TOKEN_ERROR;
    payload: IError;
}

export interface IActionUpdateUserRequest {
    type: ActionTypes.UPDATE_USER_REQUEST;
}

export interface IActionUpdateUserSuccess {
    type: ActionTypes.UPDATE_USER_SUCCESS;
    payload: IUser;
}

export interface IActionUpdateUserFailed {
    type: ActionTypes.UPDATE_USER_FAILED;
    payload: IError;
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
    | IActionLogoutFailed
    | IActionGetUserRequest
    | IActionGetUserSuccess
    | IActionGetUserFailed
    | IActionTokenRequest
    | IActionTokenSuccess
    | IActionTokenError
    | IActionUpdateUserRequest
    | IActionUpdateUserSuccess
    | IActionUpdateUserFailed;
