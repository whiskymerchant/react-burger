import { createAction } from '@reduxjs/toolkit';
import { TOrderList } from './reducer';

export type wsPayloadConnect = {
  wsUrl: string;
  withTokenRefresh: boolean
}

export const wsConnectOrder = createAction<wsPayloadConnect>('WS_CONNECT_ORDER');
export const wsDisconnectOrder = createAction('WS_DISCONNECT_ORDER');
export const wsConnectingOrder = createAction('WS_CONNECTING_ORDER');
export const wsOpenOrder = createAction('WS_OPEN_ORDER');
export const wsCloseOrder = createAction('WS_CLOSE_ORDER');
export const wsMessageOrder = createAction<TOrderList>('WS_MESSAGE_ORDER');
export const wsErrorOrder = createAction<string | undefined>('WS_ERROR_ORDER');