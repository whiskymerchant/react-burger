import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FeedsPage.module.css';
import { OrdersFeedsList } from '../../components/OrdersFeedList/OrdersFeedList';
import OrdersBoardStatus from '../../components/OrdersBoard/OrdersBoardStatus';
import { IRootReducer, Store } from '../../services/store';
import { TOrderState } from '../../services/reducers/feed/reducer';
import { BURGER_API_WSS_FEED, BURGER_API_WSS_ORDERS } from '../../utils/api';
import {
	wsConnectFeed,
	wsDisconnectFeed
} from '../../services/reducers/feed/actions';
import {
	wsConnectOrder,
	wsDisconnectOrder
} from '../../services/reducers/orders/actions';
import cn from 'classnames';

export const FeedsPage: FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			wsConnectFeed({ wsUrl: BURGER_API_WSS_FEED, withTokenRefresh: false })
		);
		dispatch(
			wsConnectOrder({ wsUrl: BURGER_API_WSS_ORDERS, withTokenRefresh: true })
		);
		return () => {
			dispatch(wsDisconnectFeed());
			dispatch(wsDisconnectOrder());
		};
	}, []);

	const { data } = useSelector<IRootReducer, TOrderState>((store) => {
		return store.liveOrder;
	});

	return (
		data && (
			<div className={styles.wrapper}>
				<div className={styles.content_wrapper}>
					<h1
						className={cn(
							styles.title,
							'text text_type_main-medium  mb-5 mt-10'
						)}
					>
						Лента заказов
					</h1>
					<div className={styles.feeds_wrapper}>
						<OrdersFeedsList path="feed" data={data} />
						<OrdersBoardStatus />
					</div>
				</div>
			</div>
		)
	);
};
