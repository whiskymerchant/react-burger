import React from "react";
import styles from "./OrderDetails.module.css";
import cn from "classnames";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { closeModal } from "../../services/reducers/currentIngredient";

const OrderDetails = ({ onClose }) => {
  const [orderWindow, setOrderWindow] = React.useState(false);
  const closeModalWindow = () => {
    setOrderWindow(false);
  };
  const order = useSelector((state) => state.orderBin);
  return (
    <>
      {/* <Modal onClose={onClose}> */}
        <div className={cn(styles.modal)}>
          <button className={cn(styles.close)} onClick={onClose}>
            <CloseIcon />
          </button>

          <p
            className={cn(
              styles.order_number,
              "text text_type_digits-large mb-8 mt-30"
            )}
          >
            {order?.data?.order?.number ?? "Буй"}
          </p>
          <p
            className={cn(
              styles.order_name,
              "mb-15 text text_type_main-medium"
            )}
          >
            {order?.data?.name ?? "Буй"}
          </p>
          <div className={cn(styles.done_image, "mb-15")}></div>
          <p
            className={cn(styles.order_name, "text text_type_main-small mb-2")}
          >
            Ваш заказ начали готовить
          </p>
          <p
            className={cn(
              styles.order_name,
              "text text_type_main-small mb-2 text_color_inactive"
            )}
          >
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      {/* </Modal>
      <ModalOverlay className={cn(styles.overlay)} onClick={closeModalWindow} /> */}
    </>
  );
};

OrderDetails.propTypes = {
  onClose: PropTypes.func,
};

export default OrderDetails;
