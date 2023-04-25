import { FC, useCallback } from 'react';
import {
	CurrencyIcon,
	FormattedDate
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrdersFeedCard.module.css';
import { TIngredient } from '../../types/ingredientTypes';
import { IngredientBar } from '../IngredientBar/IngredientBar';
import { TOrder } from '../../services/reducers/orders/reducer';
import cn from 'classnames';

interface IOrdersFeedCard {
	orderNumber: string | number;
	orderName: string;
	timeStamp: string;
	order: string[];
	ingredients: any;
}

export const OrdersFeedCard = ({
	orderNumber,
	timeStamp,
	orderName,
	order,
	ingredients
}: IOrdersFeedCard) => {
	const getFullPrice = useCallback(
		(ingredients: TIngredient[]) => {
			let price = 0;
			let isBunCalc = false;
			price = ingredients.reduce((sum, ingredient) => {
				if (ingredient) {
					if (ingredient.type === 'bun' && !isBunCalc) {
						isBunCalc = true;
						return sum + ingredient.price * 2;
					}
					if (ingredient.type !== 'bun') return sum + ingredient.price;
				}
				return sum;
			}, price);
			return price;
		},
		[order]
	);

	const getOrderIngredients = (order: string[]) => {
		let result = order.map((ingredientId) => {
			const ingredient = ingredients.find(
				({ _id }: TIngredient) => _id === ingredientId
			);
			if (ingredient) return ingredient;
		});
		return result;
	};

	const filterOrderIngredients = (ingredients: TIngredient[]) => {
		const result = ingredients.filter(function (item, index) {
			if (item)
				return (
					ingredients.findIndex((ingredient) => {
						if (ingredient) {
							return ingredient._id === item._id;
						}
					}) == index
				);
		});
		return result;
	};

	const orderIngredients = getOrderIngredients(order);
	const price = getFullPrice(orderIngredients as TIngredient[]);
	const filteredOrderIngredients = filterOrderIngredients(
		orderIngredients as TIngredient[]
	);

	return (
		<div className={styles.container}>
			<div className={cn(styles.date_number, 'mb-6')}>
				<p className="text text_type_digits-default">#{orderNumber}</p>
				<FormattedDate
					className="text text_type_main-default text_color_inactive"
					date={new Date(timeStamp)}
				/>
			</div>
			<p className="text text_type_main-medium mb-6">{orderName}</p>
			<div className={styles.ingred_price}>
				<IngredientBar ingredients={filteredOrderIngredients} />
				<div className={styles.price}>
					<p className="text text_type_digits-default">{price}</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
};
