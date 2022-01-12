import { AxiosError } from "axios";
import { Reducer } from "redux";
import { AccountActionsType, ActionTypes } from "services/account";
import { IUser } from "./types";

interface IAccountState {
    accessToken: string | null;
    refreshToken: string | null;
    success: boolean;
    user: IUser | null;
    loginRequest: boolean;
    loginFailed: boolean;
    registerRequest: boolean;
    registerFailed: boolean;
    error: AxiosError | null;
}

const initialState: IAccountState = {
    accessToken: null,
    refreshToken: null,
    success: false,
    user: null,
    loginRequest: false,
    loginFailed: false,
    registerRequest: false,
    registerFailed: false,
    error: null,
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
                loginError: null,
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
                registerError: null,
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
        default:
            return state;
    }
};
