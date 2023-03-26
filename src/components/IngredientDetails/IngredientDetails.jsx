import styles from './IngredientDetails.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';



const IngredientDetails = ({data}) => {
  return (
  <section>
    <div className={cn(styles.image_container, 'mr-25 ml-25')}>
      <img className={cn(styles.image)} src={data.image_large}></img>
    </div>
    <p className={cn(styles.description, 'text text_type_main-medium mt-4 mb-8')}>{data.name}</p>
    <div className={cn(styles.nutrition_block)}>
      <div className={cn(styles.nutrition_element)}>
        <p className={cn('text text_type_main-default text_color_inactive mb-2')}>Калории,ккал</p>
        <p className={cn(styles.nutrition_figure, 'text text_type_digits-medium text_color_inactive')}>{data.calories}</p>
      </div>
      <div className={cn(styles.nutrition_element)}>
        <p className={cn('text text_type_main-default text_color_inactive mb-2')}>Белки, г</p>
        <p className={cn(styles.nutrition_figure, 'text text_type_digits-medium text_color_inactive')}>{data.proteins}</p>
      </div>
      <div className={cn(styles.nutrition_element)}>
        <p className={cn('text text_type_main-default text_color_inactive mb-2')}>Жиры, г</p>
        <p className={cn(styles.nutrition_figure, 'text text_type_digits-medium text_color_inactive')}>{data.fat}</p>
      </div>
      <div className={cn(styles.nutrition_element)}>
        <p className={cn('text text_type_main-default text_color_inactive mb-2')}>Углеводы, г</p>
        <p className={cn(styles.nutrition_figure, 'text text_type_digits-medium text_color_inactive')}>{data.carbohydrates}</p>
      </div>

    </div>

  </section>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.object.isRequired
}

export default IngredientDetails;