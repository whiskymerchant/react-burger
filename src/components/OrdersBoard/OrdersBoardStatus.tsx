import { FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './OrdersBoardStatus.module.css';
import { IRootReducer } from '../../services/store';
import { TOrderState } from '../../services/reducers/feed/reducer';
import { TOrder } from '../../services/reducers/orders/reducer';
import cn from 'classnames';

const OrdersBoardStatus: FC = () => {
	const { data } = useSelector<IRootReducer, TOrderState>(
		(store) => store.liveOrder
	);

	if (!data) return <p>Error</p>;

	const feedsDone: TOrder[] = data.orders
		.filter((order) => order.status === 'done')
		.slice(0, 5);
	const feedsCooking: TOrder[] = data.orders
		.filter((order) => order.status === 'pending')
		.slice(0, 5);

	return (
		<div>
			<div className={cn(styles.columns, 'mb-15')}>
				<div className={styles.column}>
					<div className={styles.columnTitle}>
						<p className="text text_type_main-medium pb-6">Готовы:</p>
					</div>
					<div className={styles.column_numbers}>
						<div className={styles.column}>
							{feedsDone.map((el) => {
								return (
									<p
										className={cn(
											styles.ready,
											'text text_type_digits-default mb-2'
										)}
									>
										{el.number}
									</p>
								);
							})}
						</div>
					</div>
				</div>
				<div className={styles.column}>
					<p className="text text_type_main-medium pb-6">В работе:</p>
					{feedsCooking.map((el) => {
						return (
							<p className="text text_type_digits-default mb-2">{el.number}</p>
						);
					})}
				</div>
			</div>
			<p className="text text_type_main-medium">Выполнено за все время:</p>
			<p className="text text_type_digits-large mb-15">{data.total}</p>
			<p className="text text_type_main-medium">Выполнено за сегодня:</p>
			<p className="text text_type_digits-large">{data.totalToday}</p>
		</div>
	);
};
export default OrdersBoardStatus;
