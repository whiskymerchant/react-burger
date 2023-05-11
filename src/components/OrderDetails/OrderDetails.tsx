import styles from './OrderDetails.module.css';
import cn from 'classnames';
import { useAppSelector } from '../../utils/hooks';

const OrderDetails = () => {
	const order = useAppSelector((state) => state.orderBin);
	return (
		<div className="pt-30 pb-30">
			<p
				className={cn(styles.order_number, 'text text_type_digits-large mb-8')}
			>
				{order?.data?.order?.number ?? 'Ожидайте'}
			</p>
			<p className={cn(styles.order_name, 'mb-15 text text_type_main-medium')}>
				{order?.data?.name ?? 'Формируем заказ'}
			</p>
			<div className={cn(styles.done_image, 'mb-15')}></div>
			<p className={cn(styles.order_name, 'text text_type_main-small mb-2')}>
				Ваш заказ начали готовить
			</p>
			<p
				className={cn(
					styles.order_name,
					'text text_type_main-small text_color_inactive'
				)}
			>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};

export default OrderDetails;
