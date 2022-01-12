import { BASE_URL } from "constants/routes";
import axios from "axios";
import {
    ActionTypes,
    ILoginRequest,
    ILoginResponse,
    IRegisterRequest,
    IRegisterResponse,
} from "services/account";
import { setCookie, getCookie } from "utils/coockie";

const LOGIN_URL = `${BASE_URL}auth/login`;
const REGISTER_URL = `${BASE_URL}auth/register`;
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
