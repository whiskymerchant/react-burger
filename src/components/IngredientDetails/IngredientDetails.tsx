import styles from './IngredientDetails.module.css';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { IRootReducer } from '../../services/store';
import { useAppSelector } from '../../utils/hooks';

const IngredientDetails = () => {
	const { idIngredient } = useParams();
	const ingredients = useAppSelector(
		(state: IRootReducer) => state.ingredientsStore.data
	);
	const currentIngredient = ingredients.find(
		(item) => item._id === idIngredient
	);
	return (
		<div className={cn(styles.modal, 'pt-10 pb-15')}>
			<p className="text text_type_main-large ml-30 mb-4">Детали ингредиента</p>
			<div className={cn(styles.image_container, 'mr-25 ml-25 mb-4')}>
				<img
					className={cn(styles.image)}
					src={currentIngredient?.image_large}
				></img>
			</div>
			<p className={cn(styles.description, 'text text_type_main-medium mb-8')}>
				{currentIngredient?.name}
			</p>
			<div className={cn(styles.nutrition_block)}>
				<div className={cn(styles.nutrition_element)}>
					<p
						className={cn(
							'text text_type_main-default text_color_inactive mb-2'
						)}
					>
						Калории,ккал
					</p>
					<p
						className={cn(
							styles.nutrition_figure,
							'text text_type_digits-medium text_color_inactive'
						)}
					>
						{currentIngredient?.calories}
					</p>
				</div>
				<div className={cn(styles.nutrition_element)}>
					<p
						className={cn(
							'text text_type_main-default text_color_inactive mb-2'
						)}
					>
						Белки, г
					</p>
					<p
						className={cn(
							styles.nutrition_figure,
							'text text_type_digits-medium text_color_inactive'
						)}
					>
						{currentIngredient?.proteins}
					</p>
				</div>
				<div className={cn(styles.nutrition_element)}>
					<p
						className={cn(
							'text text_type_main-default text_color_inactive mb-2'
						)}
					>
						Жиры, г
					</p>
					<p
						className={cn(
							styles.nutrition_figure,
							'text text_type_digits-medium text_color_inactive'
						)}
					>
						{currentIngredient?.fat}
					</p>
				</div>
				<div className={cn(styles.nutrition_element)}>
					<p
						className={cn(
							'text text_type_main-default text_color_inactive mb-2'
						)}
					>
						Углеводы, г
					</p>
					<p
						className={cn(
							styles.nutrition_figure,
							'text text_type_digits-medium text_color_inactive'
						)}
					>
						{currentIngredient?.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};

export default IngredientDetails;
