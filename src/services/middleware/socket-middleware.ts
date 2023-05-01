import {
	ActionCreatorWithOptionalPayload,
	ActionCreatorWithPayload,
	ActionCreatorWithoutPayload,
	Middleware,
	MiddlewareAPI
} from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';
import { TOrderList } from '../reducers/orders/reducer';
import { refreshToken } from '../../utils/api';
import { wsPayloadConnect } from '../reducers/orders/actions';

type TWsActions = {
	wsConnect: ActionCreatorWithPayload<wsPayloadConnect>;
	wsDisconnect: ActionCreatorWithoutPayload;
	wsConnecting: ActionCreatorWithoutPayload;
	wsOpen: ActionCreatorWithoutPayload;
	wsClose: ActionCreatorWithoutPayload;
	wsError: ActionCreatorWithOptionalPayload<string | undefined>;
	wsMessage: ActionCreatorWithPayload<TOrderList>;
};

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
	return (store) => {
		console.log('store.getState()', store.getState());
		let socket: WebSocket | null = null;
		let reconnectTimer: number = 0;
		let isConnected: boolean = false;
		let wsUrl: string = '';
		let withTokenRefresh: boolean = false;
		return (next) => (action) => {
			const { dispatch } = store;
			const {
				wsConnect,
				wsDisconnect,
				wsConnecting,
				wsOpen,
				wsClose,
				wsError,
				wsMessage
			} = wsActions;
			if (wsConnect.match(action)) {
				wsUrl = action.payload.wsUrl;
				withTokenRefresh = action.payload.withTokenRefresh;
				socket = new WebSocket(`${wsUrl}`);

				isConnected = true;
				dispatch(wsConnecting());
			}
			if (socket) {
				socket.onopen = (event) => {
					dispatch(wsOpen());
				};

				socket.onerror = (event) => {
					console.log('socket.onerror', event);
				};

				socket.onclose = (event) => {
					if (event.code !== 1000) {
						console.log('socket.onclose error', event);
						dispatch(wsError(event.code.toString()));
					}

					if (isConnected && event.code !== 1000) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(wsConnect({ wsUrl, withTokenRefresh }));
						}, 3000);
					}
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData = JSON.parse(data);

					if (
						withTokenRefresh &&
						parsedData.message === 'Invalid or missing token'
					) {
						refreshToken()
							.then((refreshData) => {
								console.log('refreshData', refreshData);
								setCookie('refreshToken', refreshData.refreshToken);
								setCookie('accessToken', refreshData.accessToken);
								const newWsUrl = new URL(wsUrl);
								newWsUrl.searchParams.set(
									'token',
									refreshData.accessToken.replace('Bearer ', '')
								);

								dispatch(
									wsConnect({
										wsUrl: newWsUrl.href.toString(),
										withTokenRefresh
									})
								);
							})
							.catch((err) => {
								dispatch(wsError(err.message.toString()));
							});
					}
					dispatch(wsMessage(parsedData));
				};
			}

			if (wsDisconnect.match(action) && socket) {
				clearTimeout(reconnectTimer);
				isConnected = false;
				reconnectTimer = 0;
				socket.close(1000, 'Работа закончена');

				dispatch(wsClose());
			}

			next(action);
		};
	};
};
