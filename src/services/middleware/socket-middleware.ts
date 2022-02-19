import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, TApplicationActions, TWsActions } from "services/types";
import { RootState } from "services/types";
import { getCookie } from "utils/coockie";

export const socketMiddleware =
    (wsUrl: string, wsActions: TWsActions, isToken: boolean): Middleware =>
    (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, wsStop, onOpen, onClose, onError, onMessage } =
                wsActions;
            const token = isToken ? getCookie("accessToken") : null;

            if (type === wsInit) {
                socket = token
                    ? new WebSocket(`${wsUrl}?token=${token}`)
                    : new WebSocket(`${wsUrl}`);
            }

            if (socket) {
                if (type === wsStop) {
                    socket.close(1000, "Выход пользователя");
                }

                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };
                socket.onmessage = event => {
                    const data = JSON.parse(event.data);
                    if (!data.success) {
                        dispatch({
                            type: onError,
                            payload: new Event(data.message),
                        });
                        return;
                    }
                    dispatch({
                        type: onMessage,
                        payload: {
                            ...data,
                        },
                    });
                };
                socket.onerror = (error: Event) => {
                    dispatch({ type: onError, payload: error });
                };
                socket.onclose = () => dispatch({ type: onClose });
            }
            next(action);
        };
    };
