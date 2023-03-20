import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector } from 'react-redux/es/exports';
import { useDrop } from 'react-dnd'
import { addConstructor } from '../../services/reducers/constructor';



const BurgerConstructor = () => {

  const {bun, ingredients} = useSelector(state => state.constructorStore);
  const dispatch = useDispatch();
 
  const [orderWindow, setOrderWindow] = React.useState(false);
  const closeModalWindow = () => {setOrderWindow(null)};

  const [collected, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient, monitor) {
        console.log('drop =>', ingredient);
        dispatch(addConstructor(ingredient));
    },
    collect: monitor => ({
        isHover: monitor.isOver()
    })
})

  return (
    <section className={cn(styles.section, 'mt-25')} ref={dropTarget}>
      <ConstructorElement 
        {...bun}
        type='top'
        thumbnail={bun?.image}
        text={bun?.name}
      />
      
      <div className={cn(styles.no_buns_ingredients, 'custom-scroll mb-4 mt-4')}>
        {ingredients.map(data => (
        <div className={cn(styles.constructor_container)}>  
          <DragIcon className={cn(styles.dragicon)} type="primary" />
          <ConstructorElement 
            thumbnail={data.image} 
            key={data.id} 
            text={data.name} 
            {...data}
            />
        </div>
        )
        )}
      </div>
      
      <ConstructorElement 
        {...bun} 
        type='bottom'
        thumbnail={bun?.image}
        text={bun?.name}
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