import React from 'react';
import styles from './IngredientCategory.module.css';
import { BurgerIngredient } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';

const IngredientCategory = ({title, id, ingredients}) => {
  return (
    <>
      <h2 className={cn('text text_type_main-medium')} id={id}>{title}</h2>
      <div className={cn(styles.category, 'mb-10 mt-6')}>
        {ingredients?.map(data => <BurgerIngredient key={data._id} {...data} count={100500} />)}
      </div>
    </>
    )
}

export default IngredientCategory;