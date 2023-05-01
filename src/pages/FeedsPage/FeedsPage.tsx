import { FC, useEffect } from 'react';
import styles from './FeedsPage.module.css';
import { OrdersFeedsList } from '../../components/OrdersFeedList/OrdersFeedList';
import OrdersBoardStatus from '../../components/OrdersBoard/OrdersBoardStatus';
import { IRootReducer } from '../../services/store';
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
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export const FeedsPage: FC = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(
			wsConnectFeed({ wsUrl: BURGER_API_WSS_FEED, withTokenRefresh: false })
		);
		return () => {
			dispatch(wsDisconnectFeed());
		};
	}, []);

	const { data } = useAppSelector((store) => {
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
