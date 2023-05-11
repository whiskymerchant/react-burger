import React from 'react';
import styles from './IngredientCategory.module.css';
import cn from 'classnames';
import { openModal } from '../../services/reducers/currentIngredient';
import BurgerIngredientWrap from '../BurgerIngredientWrap/BurgerIngredientWrap';
import { TIngredient } from '../../types/ingredientTypes';
import { useAppDispatch } from '../../utils/hooks';

interface IIngredientCategory {
	title: string;
	id: string;
	ingredients: TIngredient[];
}

const IngredientCategory = React.forwardRef(
	(
		{ title, id, ingredients }: IIngredientCategory,
		ref: React.Ref<HTMLInputElement> | undefined
	) => {
		const dispatch = useAppDispatch();

		return (
			<>
				<h2 className={cn('text text_type_main-medium')} id={id} ref={ref}>
					{title}
				</h2>
				<div className={cn(styles.category, 'mb-10 mt-6')}>
					{ingredients?.map((ingredient) => (
						<BurgerIngredientWrap
							data={ingredient}
							key={ingredient._id}
							onClick={() => {
								dispatch(openModal(ingredient));
							}}
						/>
					))}
				</div>
			</>
		);
	}
);

export default IngredientCategory;
