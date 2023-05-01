import React, { useMemo, useCallback } from 'react';
import styles from './OrderInfo.module.css';
import {
	CurrencyIcon,
	FormattedDate
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RoundIcon } from '../RoundIcon/RoundIcon';
import { IRootReducer } from '../../services/store';
import cn from 'classnames';
import { TOrder } from '../../services/reducers/orders/reducer';
import { useAppSelector } from '../../utils/hooks';

const OrderInfo = ({ order }: { order: TOrder }) => {
	const ingredients = useAppSelector(
		(state: IRootReducer) => state.ingredientsStore.data
	);

	const orderIngredients = ingredients.filter((ingredient) =>
		order?.ingredients.includes(ingredient._id)
	);

	const numberOfEach = order?.ingredients.map((id) => {
		return ingredients.find((item) => item._id === id);
	});

	const getFullPrice = numberOfEach?.reduce(
		(num, ingredient) => num + ingredient!.price,
		0
	);

	const location = useLocation();

	return (
		<Link
			to={{
				pathname:
					location.pathname === '/feed'
						? `/feed/${order._id}`
						: `/profile/orders/${order._id}`
			}}
			state={{ background: location }}
			className={styles.link}
		>
			<div className={styles.orders}>
				<div className={styles.number}>
					<p className="text text_type_digits-default">#{order?.number}</p>
					{order && (
						<FormattedDate
							className="text text_type_main-default text_color_inactive"
							date={new Date(order.createdAt)}
						/>
					)}
				</div>
				<h3 className="text text_type_main-medium">{order?.name}</h3>
				<div className={styles.container}>
					<div className={styles.images}>
						{orderIngredients.map((item) => {
							return <RoundIcon img={item.image_mobile} />;
						})}
					</div>
					<div className={styles.price}>
						<p className="text text_type_digits-default">{getFullPrice}</p>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</div>
		</Link>
	);
};
export default OrderInfo;
