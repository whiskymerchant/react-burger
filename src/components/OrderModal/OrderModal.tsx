import React, { useMemo, useCallback } from 'react';
import styles from './OrderModal.module.css';
import {
	CurrencyIcon,
	FormattedDate
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { RoundIcon } from '../RoundIcon/RoundIcon';
import { IRootReducer } from '../../services/store';
import cn from 'classnames';
import { useAppSelector } from '../../utils/hooks';

const OrderModal = () => {
	const id = useParams();

	const ingredients = useAppSelector(
		(state: IRootReducer) => state.ingredientsStore.data
	);

	const orders = useAppSelector(
		(state: IRootReducer) => state.liveOrder.data?.orders
	);

	const order = orders?.find((order: any) => order._id === id.idOrder);

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

	return (
		<div className={styles.container}>
			<p className="text text_type_digits-default mt-10">#{order?.number}</p>
			<p className={cn(styles.name, 'text text_type_main-medium mt-10')}>
				{order?.name}
			</p>
			<p className={cn(styles.status, 'text text_type_main-default mt-3')}>
				{order?.status === 'done' ? 'Готов' : 'Готовится'}
			</p>
			<h2 className="text text_type_main-medium mt-15">Состав:</h2>
			<div className={cn(styles.orders, 'custom-scroll')}>
				{orderIngredients!.map((item) => (
					<div className={cn(styles.order, 'pr-2')} key={item._id}>
						<div className={styles.item}>
							<RoundIcon img={item.image_mobile} />
							<p className="text_type_main-default ml-2">{item.name}</p>
						</div>
						<p className={cn(styles.price, 'text text_type_digits-default')}>
							{
								numberOfEach?.filter(
									(ingredient) => ingredient!._id === item._id
								).length
							}
							{' x '}
							{item.price} <CurrencyIcon type="primary" />
						</p>
					</div>
				))}
			</div>
			<div className={cn(styles.summary, 'mt-10 mb-10')}>
				{order && (
					<FormattedDate
						className="text text_type_main-default text_color_inactive"
						date={new Date(order.createdAt)}
					/>
				)}
				<div className={cn(styles.total, 'mt-1 mb-2')}>
					<p className="text text_type_digits-default">{getFullPrice}</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
};

export default OrderModal;
