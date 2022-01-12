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

export type AccountActionsType =
    | IActionLoginRequest
    | IActionLoginSuccess
    | IActionLoginFailed
    | IActionRegisterRequest
    | IActionRegisterSuccess
    | IActionRegisterFailed;
