import React from "react";
import { useDispatch } from "react-redux";
import styles from "./IngredientCategory.module.css";
import cn from "classnames";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/prop-types";
import { openModal } from "../../services/reducers/currentIngredient";
import { useSelector } from "react-redux";
import BurgerIngredientWrap from "../BurgerIngredientWrap/BurgerIngredientWrap";

interface IIngredientCategory {
  title: string;
  id: number;
  ingredients: string[];
}

interface RootState {
  isOn: boolean
}

const IngredientCategory = React.forwardRef(
  ({ title, id, ingredients }: IIngredientCategory, ref) => {
    const dispatch = useDispatch();
    const currentIngredient = useSelector((state) => state.currentIngredient);

    const counter = useSelector((state) => state.constructorStore);

    return (
      <>
        <h2 className={cn("text text_type_main-medium")} id={id} ref={ref}>
          {title}
        </h2>
        <div className={cn(styles.category, "mb-10 mt-6")}>
          {ingredients?.map((data) => (
            <BurgerIngredientWrap
              data={data}
              key={data._id}
              onClick={() => {
                dispatch(openModal(data));
              }}
            />
          ))}
        </div>
      </>
    );
  }
);

IngredientCategory.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default IngredientCategory;
