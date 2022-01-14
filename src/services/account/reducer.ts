import { AxiosError } from "axios";
import { Reducer } from "redux";
import { AccountActionsType, ActionTypes } from "services/account";
import { getCookie } from "utils/coockie";
import { IUser } from "./types";

interface IAccountState {
    accessToken: string | null;
    refreshToken: string | null;
    emailSent: boolean;
    passwordReseted: boolean;
    success: boolean;
    user: IUser | null;
    forgotPasswordRequest: boolean;
    forgotPasswordFailed: boolean;
    getUserRequest: boolean;
    getUserFailed: boolean;
    loginRequest: boolean;
    loginFailed: boolean;
    logoutRequest: boolean;
    logoutFailed: boolean;
    registerRequest: boolean;
    registerFailed: boolean;
    resetPasswordRequest: boolean;
    resetPasswordFailed: boolean;
    error: AxiosError | null;
    updateUserRequest: boolean;
    updateUserFailed: boolean;
}

const initialState: IAccountState = {
    accessToken: getCookie("accessToken") || null,
    refreshToken: getCookie("refreshToken") || null,
    emailSent: false,
    passwordReseted: false,
    success: false,
    user: null,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    getUserRequest: false,
    getUserFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    registerRequest: false,
    registerFailed: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    error: null,
    updateUserRequest: false,
    updateUserFailed: false,
};

export const reducer: Reducer<IAccountState, AccountActionsType> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionTypes.LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false,
                error: null,
                success: false,
            };
        }
        case ActionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                loginRequest: false,
                success: action.payload.success,
                user: action.payload.user,
            };
        case ActionTypes.LOGIN_USER_FAILED:
            return {
                ...state,
                loginRequest: false,
                loginFailed: true,
                error: action.payload,
            };
        case ActionTypes.REGISTER_USER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
                error: null,
                success: false,
            };
        }
        case ActionTypes.REGISTER_USER_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                registerRequest: false,
                success: action.payload.success,
                user: action.payload.user,
            };
        case ActionTypes.REGISTER_USER_FAILED:
            return {
                ...state,
                registerRequest: false,
                registerFailed: true,
                error: action.payload,
            };
        case ActionTypes.FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                emailSent: false,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false,
                error: null,
            };
        }
        case ActionTypes.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                emailSent: true,
                forgotPasswordRequest: false,
            };
        case ActionTypes.FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true,
                error: action.payload,
            };
        case ActionTypes.RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                passwordReseted: false,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
                error: null,
            };
        }
        case ActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                passwordReseted: true,
                resetPasswordRequest: false,
            };
        case ActionTypes.RESET_PASSWORD_FAILED:
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true,
                error: action.payload,
            };
        case ActionTypes.LOGOUT_USER_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false,
                error: null,
            };
        }
        case ActionTypes.LOGOUT_USER_SUCCESS:
            return {
                ...state,
                accessToken: "",
                logoutRequest: false,
                refreshToken: "",
                user: null,
            };
        case ActionTypes.LOGOUT_USER_FAILED:
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true,
                error: action.payload,
            };
        case ActionTypes.GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false,
                error: null,
            };
        }
        case ActionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                getUserRequest: false,
                user: action.payload,
            };
        case ActionTypes.GET_USER_FAILED:
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true,
                error: action.payload,
            };
        case ActionTypes.UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false,
                error: null,
            };
        }
        case ActionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateUserRequest: false,
                user: action.payload,
            };
        case ActionTypes.UPDATE_USER_FAILED:
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true,
                error: action.payload,
            };
        default:
            return state;
    }
};
