import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './OrdersPage.module.css';
import { Link, useMatch } from 'react-router-dom';
import { IRootReducer } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { TOrder } from '../../services/reducers/orders/reducer';
import {
	wsConnectFeed,
	wsDisconnectFeed
} from '../../services/reducers/feed/actions';
import {
	wsConnectOrder,
	wsDisconnectOrder
} from '../../services/reducers/orders/actions';
import { BURGER_API_WSS_FEED, BURGER_API_WSS_ORDERS } from '../../utils/api';
import OrderInfo from '../../components/OrderInfo/OrderInfo';

interface IProfileLogout {
	onLogout: () => void;
}

const OrdersPage: React.FC<IProfileLogout> = ({ onLogout }) => {
	const isProfile = useMatch('/profile');
	const isOrders = useMatch('/profile/orders');

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

	const orders = useSelector((state: any) => state?.myOrders?.data?.orders);

	return (
		<div className={cn(styles.main_container)}>
			<div className={cn(styles.left_container, 'mr-15')}>
				<Link
					to="/profile"
					className={cn(
						styles.text_container,
						`text text_type_main-default ${
							isProfile
								? `${styles.links_state_active}`
								: `${styles.links_state_inactive}`
						}`
					)}
				>
					Профиль
				</Link>
				<Link
					to="/profile/orders"
					className={cn(
						styles.text_container,
						`text text_type_main-default ${
							isOrders
								? `${styles.links_state_active}`
								: `${styles.links_state_inactive}`
						}`
					)}
				>
					История заказов
				</Link>
				<div
					className={cn(
						styles.text_container,
						'text text_type_main-default mb-20'
					)}
				>
					Выход
				</div>
				<div className={cn('text text_type_main-small text_color_inactive')}>
					В этом разделе вы можете посмотреть свои заказы
				</div>
			</div>
			<div className={cn(styles.right_container, 'custom-scroll')}>
				{orders && orders.length > 0 ? (
					<div className={cn(styles.container, 'custom-scroll')}>
						{orders?.map((order: TOrder) => {
							return <OrderInfo order={order} key={order?._id} />;
						})}
					</div>
				) : (
					<p className={cn(styles.empty, 'text text_type_main-medium')}>
						Вы еще ничего не заказали
					</p>
				)}
			</div>
		</div>
	);
};

export default OrdersPage;
