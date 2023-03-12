import React from 'react';
import styles from './IngredientCategory.module.css';
import { BurgerIngredient } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../utils/prop-types';

const IngredientCategory = ({title, id, ingredients}) => {
  
  const [ingredientWindow, setIngredientWindow] = React.useState(false);
  const closeModalWindow = () => {setIngredientWindow(null)};

  return (
  <>
      <h2 className={cn('text text_type_main-medium')} id={id}>{title}</h2>
      <div className={cn(styles.category, 'mb-10 mt-6')}>
        {ingredients?.map(data => <BurgerIngredient key={data._id} {...data} count={100500} onClick={() => setIngredientWindow(data)}/>)}
      </div>
      {ingredientWindow && <Modal title='Детали ингредиента' onClose={closeModalWindow}>
        <IngredientDetails data={ingredientWindow}/>
        </Modal>}
  </>
  )
};

IngredientCategory.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}

export default IngredientCategory;