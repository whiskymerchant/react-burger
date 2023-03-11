import React from 'react';
import styles from './OrderDetails.module.css';
import cn from 'classnames';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';



const OrderDetails = ({onClose}) => {

  return (
  <section className={cn(styles.modal)}>
    <CloseIcon className={cn(styles.close)} onClick={onClose}/>
    <p className={cn(styles.order_number, 'text text_type_digits-large mb-8 mt-30')}>000</p>
    <p className={cn('mb-15 text text_type_main-medium')}>идентификатор заказа</p>
    <div className={cn(styles.done_image, 'mb-15')}></div>
    <p className={cn('text text_type_main-small mb-2')}>Ваш заказ начали готовить</p>
    <p className={cn('text text_type_main-small mb-2 text_color_inactive')}>Дождитесь готовности на орбитальной станции</p>
    <ModalOverlay className={cn(styles.overlay)} onClick={onClose} />

  </section>
  )
}

export default OrderDetails;