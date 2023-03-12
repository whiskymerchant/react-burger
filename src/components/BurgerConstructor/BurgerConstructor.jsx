import React from 'react';

import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import OrderDetails from '../OrderDetails/OrderDetails';


const BurgerConstructor = ({constructorIngredients}) => {

  const buns = constructorIngredients.find(data => data.type === 'bun')
  const bunsLast = constructorIngredients.findLast(data => data.type === 'bun')
  const nobuns = constructorIngredients.filter(data => data.type !== 'bun')

  
  const [orderWindow, setOrderWindow] = React.useState(false);
  const closeModalWindow = () => {setOrderWindow(null)};

  return (
    <section className={cn(styles.section, 'mt-25')}>
      <ConstructorElement  
        {...buns}
        type='top'
        thumbnail={buns?.image}
        key={buns?._id}
        text={buns?.name}
      />
      
      <div className={cn(styles.no_buns_ingredients, 'custom-scroll')}>
        {nobuns.map(data => <ConstructorElement thumbnail={data.image} key={data._id} text={data.name} {...data}/>)}
      </div>
      
      <ConstructorElement 
        {...bunsLast} 
        type='bottom'
        thumbnail={bunsLast?.image}
        key={bunsLast?._id}
        text={bunsLast?.name}
      />

      <div className={cn(styles.counter_final, '')}>
        <div className={cn(styles.sum_and_icon_block)}>
          <p className="text text_type_digits-medium mr-2">000</p>
          <CurrencyIcon type="primary"/>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => setOrderWindow(true)}>
          Оформить заказ
        </Button>
        {orderWindow && <OrderDetails onClose={closeModalWindow} /> }
      </div>

    </section>
    )
}

export default BurgerConstructor;