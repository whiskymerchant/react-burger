import styles from "./OrderDetails.module.css";
import cn from "classnames";
import { useSelector } from "react-redux";
import { IRootReducer } from "../../services/store";

const OrderDetails = () => {
  const order = useSelector((state: IRootReducer) => state.orderBin);
  return (
    <div className="pt-30 pb-30">
      <p
        className={cn(styles.order_number, "text text_type_digits-large mb-8")}
      >
        {order?.data?.order?.number ?? "Буй"}
      </p>
      <p className={cn(styles.order_name, "mb-15 text text_type_main-medium")}>
        {order?.data?.name ?? "Буй"}
      </p>
      <div className={cn(styles.done_image, "mb-15")}></div>
      <p className={cn(styles.order_name, "text text_type_main-small mb-2")}>
        Ваш заказ начали готовить
      </p>
      <p
        className={cn(
          styles.order_name,
          "text text_type_main-small text_color_inactive"
        )}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
