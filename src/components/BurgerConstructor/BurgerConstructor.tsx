import React from 'react';
import styles from './BurgerConstructor.module.css';
import {
	ConstructorElement,
	Button,
	CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDrop } from 'react-dnd';
import { addConstructor } from '../../services/reducers/constructor';
import { fetchOrderSlice } from '../../services/reducers/order';
import { useMemo } from 'react';
import { increaseCount } from '../../services/reducers/ingredients';
import ConstructorElementWrap from '../ConstructorElementWrap/ConstructorElementWrap';
import Modal from '../Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { IRootReducer } from '../../services/store';
import { TIngredient } from '../../types/ingredientTypes';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const BurgerConstructor = ({ user }: any) => {
	const { bun, ingredients } = useAppSelector(
		(state: IRootReducer) => state.constructorStore
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [orderWindow, setOrderWindow] = React.useState(false);
	const closeModalWindow = () => {
		setOrderWindow(false);
	};

	const [{ isHover }, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(ingredient: TIngredient, monitor) {
			dispatch(addConstructor(ingredient));

			dispatch(increaseCount(ingredient));
		},
		collect: (monitor) => ({
			isHover: monitor.isOver()
		})
	});

	const onSendOrder = () => {
		if (!user) {
			navigate('/login');
		}
		const order: string[] = [];
		const bunsOrder = bun?._id;
		if (bunsOrder) {
			order.push(bunsOrder);
			ingredients.forEach((ingredient) => {
				order.push(ingredient._id);
			});
			order.push(bunsOrder);
		}
		dispatch(fetchOrderSlice(order));
		setOrderWindow(true);
	};

	const orderSum = useMemo(() => {
		let summ = 0;
		if (bun === null || undefined) {
			summ = 0;
		} else {
			summ += bun?.price * 2;
		}
		ingredients?.map((ingredient) => {
			summ += ingredient.price;
		});
		return summ;
	}, [bun, ingredients]);

	const divRef = React.useRef(null);

	return (
		<section
			id="BurgerConstructor"
			className={cn(styles.section, 'mt-25')}
			ref={dropTarget}
		>
			<div className={cn(styles.section_buns)}>
				{bun ? (
					<ConstructorElement
						{...bun}
						type="top"
						price={bun.price}
						thumbnail={bun.image}
						text={`${bun.name || 'Пожалуйста перетащите булку сюда'} (верх)`}
						isLocked={true}
					/>
				) : (
					<div> Пожалуйста перетащите булку сюда</div>
				)}
			</div>

			<div
				className={cn(styles.no_buns_ingredients, 'custom-scroll mb-4 mt-4')}
			>
				{ingredients.map((data, index) => (
					<ConstructorElementWrap
						data={data}
						index={index}
						key={data.id}
						{...data}
					/>
				))}
			</div>
			<div className={cn(styles.section_buns)}>
				{bun ? (
					<ConstructorElement
						{...bun}
						type="bottom"
						thumbnail={bun?.image}
						text={`${bun?.name || 'Пожалуйста перетащите булку сюда'} (низ)`}
						isLocked={true}
					/>
				) : (
					<div> Пожалуйста перетащите булку сюда</div>
				)}
			</div>

			<div className={cn(styles.counter_final, '')}>
				<div className={cn(styles.sum_and_icon_block)}>
					<p className="text text_type_digits-medium mr-2">{orderSum}</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button
					htmlType="button"
					type="primary"
					size="large"
					onClick={onSendOrder}
				>
					Оформить заказ
				</Button>

				{orderWindow && (
					<Modal onClose={closeModalWindow}>
						<OrderDetails />
					</Modal>
				)}
			</div>
		</section>
	);
};

export default BurgerConstructor;
