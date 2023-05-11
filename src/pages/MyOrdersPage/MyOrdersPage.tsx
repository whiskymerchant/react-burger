import React from 'react';
import styles from './MyOrdersPage.module.css';
import { NavLink, useLocation } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../utils/types/hook';
// import { getCookie } from '../API/cookies';
// import { logoutUser } from '../services/features/UserSlice';
// import OrderTemplate from '../components/UI/OrderTemplate/OrderTemplate';
// import { TOrder } from '../services/features/reducers/feedPage/reducer';
import { getCookie } from '../../utils/cookie';
import { BURGER_API_WSS_ORDERS, logoutUser } from '../../utils/api';
import { OrdersFeedCard } from '../../components/OrdersFeedCard/OrdersFeedCard';
import { TOrder } from '../../services/reducers/orders/reducer';
import {
	wsConnectOrder,
	wsDisconnectOrder
} from '../../services/reducers/orders/actions';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export const MyOrdersPage = () => {
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		dispatch(
			wsConnectOrder({ wsUrl: BURGER_API_WSS_ORDERS, withTokenRefresh: false })
		);
		return () => {
			dispatch(wsDisconnectOrder());
		};
	}, []);
	const { data } = useAppSelector((store) => store.myOrders);
	const inactiveClassName = `${styles.link} ${styles.profilelink} text text_type_main-medium text_color_inactive`;
	const activeClassName = `${styles.link} ${styles.profilelink} ${styles.active} text text_type_main-medium`;
	const token = getCookie('refreshToken');
	const RequestBody = {
		token: token
	};

	const location = useLocation();
	const isProfileActive = location.pathname == '/profile';

	return (
		<section className={styles.profile_orders}>
			<nav className={styles.menu_orders}>
				<NavLink
					className={
						isProfileActive ? `${activeClassName}` : `${inactiveClassName}`
					}
					to="/profile"
				>
					Профиль
				</NavLink>
				<NavLink
					to="/profile/orders"
					className={({ isActive }) =>
						isActive ? `${activeClassName}` : `${inactiveClassName}`
					}
				>
					История заказов
				</NavLink>
				<button
					className={`${styles.button} text text_type_main-medium text_color_inactive`}
					onClick={() => {
						logoutUser();
					}}
				>
					Выход
				</button>
				<span className="text text_type_main-default text_color_inactive mt-20">
					В этом разделе вы можете просмотреть свою историю заказов
				</span>
			</nav>
			{1 > 0 ? (
				<ul className={`${styles.orderFeed} custom-scroll`}>
					{data?.orders?.map((order: TOrder) => {
						return (
							<OrdersFeedCard
								order={[order._id]}
								key={order?._id}
								timeStamp={String(order.createdAt)}
								orderName={order.name}
								ingredients={order.ingredients}
								orderNumber={order.number}
							/>
						);
					})}
				</ul>
			) : (
				<h2
					className={`text text_type_digits-medium ${styles.digit__effect} ${styles.orderTitle}`}
				>
					У вас еще нет заказов
				</h2>
			)}
		</section>
	);
};
