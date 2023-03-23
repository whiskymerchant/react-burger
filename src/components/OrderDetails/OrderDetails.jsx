import React from "react";
import styles from "./OrderDetails.module.css";
import cn from "classnames";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useSelector } from 'react-redux';


const OrderDetails = ({ onClose }) => {
  const order = useSelector(state => state.orderBin);
  console.log(order);
  return (
    <section className={cn(styles.modal)}>
      <ModalOverlay className={cn(styles.overlay)} onClick={onClose} />
      <div className={cn(styles.popup)}>
        <button className={cn(styles.close)} onClick={onClose}>
          <CloseIcon />
        </button>
        <p
          className={cn(
            styles.order_number,
            "text text_type_digits-large mb-8 mt-30"
          )}
        >
          {order?.data?.order?.number ?? 'Буй'}
        </p>
        <p className={cn("mb-15 text text_type_main-medium")}>
          {/* идентификатор заказа */}
          {order?.data?.name ?? 'Буй'}
        </p>
        <div className={cn(styles.done_image, "mb-15")}></div>
        <p className={cn("text text_type_main-small mb-2")}>
          Ваш заказ начали готовить
        </p>
        <p className={cn("text text_type_main-small mb-2 text_color_inactive")}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </section>
  );
};

export default OrderDetails;
