import { ActionTypes } from "services/account";
import { getCookie } from "utils/coockie";
import { reducer } from "./reducer";

const initialState = {
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
    tokenRequest: false,
    tokenUpdate: false,
    tokenFailed: false,
    updateUserRequest: false,
    updateUserFailed: false,
};

describe("account reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should handle LOGIN_USER_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.LOGIN_USER_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                loginRequest: true,
                loginFailed: false,
                error: null,
                success: false,
            })
        );
    });

    it("should handle LOGIN_USER_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.LOGIN_USER_SUCCESS,
                payload: {
                    accessToken: "accessToken",
                    refreshToken: "refreshToken",
                    success: true,
                    user: { email: "test@test.ru", name: "test" },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                accessToken: "accessToken",
                refreshToken: "refreshToken",
                loginRequest: false,
                success: true,
                user: { email: "test@test.ru", name: "test" },
            })
        );
    });

    it("should handle LOGIN_USER_FAILED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.LOGIN_USER_FAILED,
                payload: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                loginRequest: false,
                loginFailed: true,
                error: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        );
    });

    it("should handle REGISTER_USER_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.REGISTER_USER_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                registerRequest: true,
                registerFailed: false,
                error: null,
                success: false,
            })
        );
    });

    it("should handle REGISTER_USER_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.REGISTER_USER_SUCCESS,
                payload: {
                    accessToken: "accessToken",
                    refreshToken: "refreshToken",
                    success: true,
                    user: { email: "test@test.ru", name: "test" },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                accessToken: "accessToken",
                refreshToken: "refreshToken",
                registerRequest: false,
                registerFailed: false,
                success: true,
                user: { email: "test@test.ru", name: "test" },
            })
        );
    });

    it("should handle REGISTER_USER_FAILED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.REGISTER_USER_FAILED,
                payload: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                registerRequest: false,
                registerFailed: true,
                error: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        );
    });

    it("should handle FORGOT_PASSWORD_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.FORGOT_PASSWORD_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                emailSent: false,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false,
                error: null,
            })
        );
    });

    it("should handle FORGOT_PASSWORD_SUCCESS:", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                emailSent: true,
                forgotPasswordRequest: false,
            })
        );
    });

    it("should handle FORGOT_PASSWORD_FAILED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.FORGOT_PASSWORD_FAILED,
                payload: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true,
                error: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        );
    });

    it("should handle RESET_PASSWORD_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.RESET_PASSWORD_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                passwordReseted: false,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
                error: null,
            })
        );
    });

    it("should handle RESET_PASSWORD_SUCCESS:", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.RESET_PASSWORD_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                passwordReseted: true,
                resetPasswordRequest: false,
            })
        );
    });

    it("should handle RESET_PASSWORD_FAILED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.RESET_PASSWORD_FAILED,
                payload: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                resetPasswordRequest: false,
                resetPasswordFailed: true,
                error: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        );
    });

    it("should handle LOGOUT_USER_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.LOGOUT_USER_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                logoutRequest: true,
                logoutFailed: false,
                error: null,
            })
        );
    });

    it("should handle LOGOUT_USER_SUCCESS:", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.LOGOUT_USER_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                accessToken: "",
                logoutRequest: false,
                refreshToken: "",
                user: null,
            })
        );
    });

    it("should handle LOGOUT_USER_FAILED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.LOGOUT_USER_FAILED,
                payload: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                logoutRequest: false,
                logoutFailed: true,
                error: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        );
    });

    it("should handle GET_USER_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.GET_USER_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                getUserRequest: true,
                getUserFailed: false,
                error: null,
            })
        );
    });

    it("should handle GET_USER_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.GET_USER_SUCCESS,
                payload: { email: "test@test.ru", name: "test" },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                getUserRequest: false,
                user: { email: "test@test.ru", name: "test" },
            })
        );
    });

    it("should handle GET_USER_FAILED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.GET_USER_FAILED,
                payload: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                getUserRequest: false,
                getUserFailed: true,
                error: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        );
    });

    it("should handle TOKEN_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.TOKEN_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                tokenRequest: true,
            })
        );
    });

    it("should handle TOKEN_SUCCESS:", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.TOKEN_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                tokenUpdate: true,
                tokenRequest: false,
                tokenFailed: false,
            })
        );
    });

    it("should handle TOKEN_ERROR", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.TOKEN_ERROR,
                payload: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                tokenRequest: false,
                tokenUpdate: false,
                tokenFailed: true,
                error: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        );
    });

    it("should handle UPDATE_USER_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.UPDATE_USER_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                updateUserRequest: true,
                updateUserFailed: false,
                error: null,
            })
        );
    });

    it("should handle UPDATE_USER_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.UPDATE_USER_SUCCESS,
                payload: { email: "test@test.ru", name: "test" },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                updateUserRequest: false,
                user: { email: "test@test.ru", name: "test" },
            })
        );
    });

    it("should handle UPDATE_USER_FAILED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.UPDATE_USER_FAILED,
                payload: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                updateUserRequest: false,
                updateUserFailed: true,
                error: {
                    success: true,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        );
    });
});
