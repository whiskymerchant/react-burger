import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector } from 'react-redux/es/exports';
import { useDrop } from 'react-dnd'
import { addConstructor, removeConstructor } from '../../services/reducers/constructor';
import { fetchOrderSlice } from '../../services/reducers/order';
import { useMemo } from 'react';



const BurgerConstructor = () => {

  const {bun, ingredients} = useSelector(state => state.constructorStore);
  const dispatch = useDispatch();
 
  const [orderWindow, setOrderWindow] = React.useState(false);
  const closeModalWindow = () => {setOrderWindow(null)};

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient, monitor) {
        console.log('drop =>', ingredient);
        dispatch(addConstructor(ingredient));
    },
    collect: monitor => ({
        isHover: monitor.isOver()
    })
})

  const onSendOrder = () => {
    const order = [];
    const bunsOrder = bun._id
    ingredients: order.push(bunsOrder);
    ingredients.forEach((ingredient) => {
      order.push(ingredient._id)
  })
    order.push(bunsOrder);
    dispatch(fetchOrderSlice(order));
    setOrderWindow(true);
  }
  
  // const data = {
  //   ingredients: ingredients.map(ingredient => ingredient['_id'])
  // };


  // const sendRequest = () => {
  //   const requestBody = []
  //   const bunsRequestFormat = bun._id
  //   requestBody.push(bunsRequestFormat);
  //   ingredients.forEach((ingredient) => {
  //       requestBody.push(ingredient._id)
  //   })
  //   requestBody.push(bunsRequestFormat);
  //   dispatch(sendOrder(requestBody))
  // }



  console.log(ingredients);

  const removeElement = (_id) => {
    dispatch(removeConstructor(_id))
}

  const orderSum = useMemo(()=> {
    let summ = 0;
    if (bun === null || undefined) {
      summ = 0
    }
    else {
      summ += bun?.price * 2
    }
      ingredients?.map(ingredient => {summ += ingredient.price})
    return summ;
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
            handleClose={removeElement}
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
          <p className="text text_type_digits-medium mr-2">{orderSum}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={onSendOrder}>
          Оформить заказ
        </Button>

        <Counter count={1} size="default" extraClass="m-1" />
        {orderWindow && <OrderDetails onClose={closeModalWindow} /> }
      </div>

    </section>
    )
}

export default BurgerConstructor;