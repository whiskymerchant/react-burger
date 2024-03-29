import { OrdersFeedCard } from '../OrdersFeedCard/OrdersFeedCard';
import styles from './OrdersFeedList.module.css';
import { Link, useLocation } from 'react-router-dom';
import { TOrderList } from '../../services/reducers/orders/reducer';
import cn from 'classnames';
import { useAppSelector } from '../../utils/hooks';

export interface IOrdersFeedsList {
	path: string;
	data: TOrderList;
}

export const OrdersFeedsList = ({ path, data }: IOrdersFeedsList) => {
	const { data: ingredients } = useAppSelector(
		(store) => store.ingredientsStore
	);

	let location = useLocation();

	return (
		<div className={cn(styles.container, 'custom-scroll')}>
			{data.orders.map((order) => {
				return (
					<Link
						className={cn(styles.link, 'text text_type_main-medium')}
						key={order._id}
						to={{
							pathname:
								location.pathname === '/feed'
									? `/feed/${order._id}`
									: `/profile/orders/${order._id}`
						}}
						state={{ background: location }}
					>
						<OrdersFeedCard
							key={order._id}
							orderName={order.name}
							orderNumber={order.number}
							timeStamp={order.createdAt.toString()}
							order={order.ingredients}
							ingredients={ingredients}
						/>
					</Link>
				);
			})}
		</div>
	);
};
