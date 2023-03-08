import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import IngredientCategory from '../IngredientCategory/IngredientCategory';

const BurgerIngredients = ({ingredients}) => {
  const [current, setCurrent] = React.useState('one');

  const breads = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const ingred = ingredients.filter(item => item.type === 'main');


  return (
    <section className={cn(styles.section)}>
    <p className={cn('text text_type_main-large mt-10 mb-5')}>Соберите бургер</p>
    <div className={cn(styles.selector)}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
    <IngredientCategory title='Булки' ingredients={breads} />
    <IngredientCategory title='Соусы' ingredients={sauces} />
    <IngredientCategory title='Начинки' ingredients={ingred} />

  </section>
  )
}

export default BurgerIngredients;