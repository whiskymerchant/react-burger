import React from "react";
import { useDispatch } from "react-redux";
import styles from "./IngredientCategory.module.css";
import { BurgerIngredient } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/prop-types";
import { addConstructor, selectCountState } from "../../services/reducers/constructor";
import { useDrag } from "react-dnd";
import {
  closeModal,
  openModal,
} from "../../services/reducers/currentIngredient";
import { useSelector } from "react-redux";
import { dragRef } from 'react'

const IngredientCategory = ({ title, id, ingredients }) => {
  const dispatch = useDispatch();
  const currentIngredient = useSelector((state) => state.currentIngredient);
  const [{ isDrag }, dragRef, dragPreviewRef] = useDrag({
    type: "ingredient",
    item: {id},   // need to get the target ingredient here
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  // const counter = useSelector((state) => selectCountState(state, id))

  return (
    <>
      <h2 className={cn("text text_type_main-medium")} id={id}>
        {title}
      </h2>
      <div className={cn(styles.category, "mb-10 mt-6")}>
        {ingredients?.map((data) => (
          <BurgerIngredient
            key={data._id}
            {...data}
            count={1}
            onClick={() => {
              dispatch(addConstructor(data));
              dispatch(openModal(data));
            }}
            ref={dragRef}
          />
        ))}
      </div>
      {currentIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch(closeModal())}
        >
          <IngredientDetails data={currentIngredient} />
        </Modal>
      )}
    </>
  );
};

IngredientCategory.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default IngredientCategory;
