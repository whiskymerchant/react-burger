import React from "react";
import { useDispatch } from "react-redux";
import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useSelector } from "react-redux/es/exports";
import { useDrop, useDrag } from "react-dnd";
import {
  addConstructor,
  removeConstructor,
} from "../../services/reducers/constructor";
import { fetchOrderSlice } from "../../services/reducers/order";
import { useMemo } from "react";
import {
  decreaseCount,
  increaseCount,
} from "../../services/reducers/ingredients";

const BurgerConstructor = (data) => {
  const { bun, ingredients } = useSelector((state) => state.constructorStore);
  const dispatch = useDispatch();

  const [orderWindow, setOrderWindow] = React.useState(false);
  const closeModalWindow = () => {
    setOrderWindow(null);
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient, monitor) {
      console.log("drop =>", ingredient);
      dispatch(addConstructor(ingredient));
      dispatch(increaseCount(ingredient._id));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [{ isDrag }, dragRef] = useDrag({
    type: "sorted",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ isHovering }, dropTargetIngred] = useDrop({
    accept: "sorted",
    drop(ingredient, monitor) {
      console.log("drop =>", ingredient);
      dispatch(addConstructor(ingredient));
      dispatch(increaseCount(ingredient._id));
    },
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
    }),
  });

  const onSendOrder = () => {
    const order = [];
    const bunsOrder = bun._id;
    order.push(bunsOrder);
    ingredients.forEach((ingredient) => {
      order.push(ingredient._id);
    });
    order.push(bunsOrder);
    dispatch(fetchOrderSlice(order));
    setOrderWindow(true);
  };

  const removeElement = (params) => {
    dispatch(removeConstructor(params));
  };

  const orderSum = useMemo(() => {
    let summ = 0;
    if (bun === null || undefined) {
      summ = 0;
    } else {
      summ += bun?.price * 2;
    }
    ingredients?.map((ingredient) => {
      summ += ingredient.price;
    });
    return summ;
  });

  return (
    <section className={cn(styles.section, "mt-25")} ref={dropTarget}>
      <ConstructorElement
        {...bun}
        type="top"
        thumbnail={bun?.image}
        text={bun?.name}
        isLocked={true}
      />

      <div
        className={cn(styles.no_buns_ingredients, "custom-scroll mb-4 mt-4")}
      >
        {ingredients.map((data) => (
          <div className={cn(styles.constructor_container)}>
            <DragIcon className={cn(styles.dragicon)} type="primary" />
            <ConstructorElement
              thumbnail={data.image}
              key={data.id}
              text={data.name}
              handleClose={() => {
                removeElement(data.id);
                dispatch(decreaseCount(data._id));
                console.log("data._id", data._id);
              }}
              {...data}
            />
          </div>
        ))}
      </div>

      <ConstructorElement
        {...bun}
        type="bottom"
        thumbnail={bun?.image}
        text={bun?.name}
        isLocked={true}
      />

      <div className={cn(styles.counter_final, "")}>
        <div className={cn(styles.sum_and_icon_block)}>
          <p className="text text_type_digits-medium mr-2">{orderSum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onSendOrder}
        >
          Оформить заказ
        </Button>

        {orderWindow && <OrderDetails onClose={closeModalWindow} />}
      </div>
    </section>
  );
};

export default BurgerConstructor;
