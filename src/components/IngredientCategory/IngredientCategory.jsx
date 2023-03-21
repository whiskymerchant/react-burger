import React from "react";
import { useDispatch } from "react-redux";
import styles from "./IngredientCategory.module.css";
import { BurgerIngredient } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/prop-types";
import { addConstructor } from "../../services/reducers/constructor";
import { useDrag } from "react-dnd/dist/hooks";
import {
  closeModal,
  openModal,
} from "../../services/reducers/currentIngredient";
import { useSelector } from "react-redux";

const IngredientCategory = ({ title, id, ingredients }) => {
  const dispatch = useDispatch();
  const currentIngredient = useSelector((state) => state.currentIngredient);
  const [{ isDrag }, drag, dragPreviewRef] = useDrag({
    type: "ingredient",
    item: {currentIngredient},   // need to get the target ingredient here
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  console.log(currentIngredient);

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
            count={100500}
            onClick={() => {
              dispatch(addConstructor(data));
              dispatch(openModal(data));
            }}
            ref={drag}
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
