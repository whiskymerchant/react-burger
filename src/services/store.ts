import { configureStore } from '@reduxjs/toolkit';
import ingredients, { TIngredientsState } from './reducers/ingredients';
import constructor, { IConstructor } from './reducers/constructor';
import ingredient, { TCurrentIngredient } from './reducers/currentIngredient';
import order, { IInitialState } from './reducers/order';
import user, { TUserState } from './reducers/user';
import { useDispatch } from 'react-redux';
import { socketMiddleware } from './middleware/socket-middleware';
import { TOrder, ordersReducer } from './reducers/orders/reducer';
import {
	wsConnectOrder,
	wsDisconnectOrder,
	wsConnectingOrder,
	wsOpenOrder,
	wsCloseOrder,
	wsErrorOrder,
	wsMessageOrder
} from './reducers/orders/actions';
import {
	wsCloseFeed,
	wsConnectFeed,
	wsConnectingFeed,
	wsDisconnectFeed,
	wsErrorFeed,
	wsMessageFeed,
	wsOpenFeed
} from './reducers/feed/actions';
import { refreshToken, sendOrder } from '../utils/api';
import { TOrderState, feedReducer } from './reducers/feed/reducer';
import thunk from 'redux-thunk';

export interface IRootReducer {
	ingredientsStore: TIngredientsState;
	constructorStore: IConstructor;
	currentIngredient: TCurrentIngredient;
	orderBin: IInitialState;
	loadUser: TUserState;
	liveOrder: TOrderState;
	myOrders: TOrderState;
}

const wsActionsFeed = {
	wsConnect: wsConnectFeed,
	wsDisconnect: wsDisconnectFeed,
	wsConnecting: wsConnectingFeed,
	wsOpen: wsOpenFeed,
	wsClose: wsCloseFeed,
	wsError: wsErrorFeed,
	wsMessage: wsMessageFeed
};

const wsActionsOrder = {
	wsConnect: wsConnectOrder,
	wsDisconnect: wsDisconnectOrder,
	wsConnecting: wsConnectingOrder,
	wsOpen: wsOpenOrder,
	wsClose: wsCloseOrder,
	wsError: wsErrorOrder,
	wsMessage: wsMessageOrder
};

const websocketOrderMiddleware = socketMiddleware(wsActionsOrder);
const websocketFeedMiddleware = socketMiddleware(wsActionsFeed);

const store = configureStore({
	reducer: {
		ingredientsStore: ingredients,
		constructorStore: constructor,
		currentIngredient: ingredient,
		orderBin: order,
		loadUser: user,
		liveOrder: feedReducer,
		myOrders: ordersReducer
	},
	//   middleware: [
	//     thunk,
	//     socketMiddleware(wsActionsOrder),
	//     socketMiddleware(wsActionsFeed),
	// ],
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: sendOrder // проверить пойдет ли рефрештокен тут: у Макса стоит весь класс Апи
			}
		}).concat(websocketOrderMiddleware, websocketFeedMiddleware)
});

export type Store = typeof store.dispatch;
export const useAppDispatch: () => Store = useDispatch;
// export type RootState = typeof store.getState;

export default store;
