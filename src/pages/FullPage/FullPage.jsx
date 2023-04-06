import React from "react";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import cn from "classnames";
import styles from "./FullPage.module.css";

const FullPage = () => {
  const params = useParams();
  const ingredients = useSelector((state) => state.ingredientsStore.data);
  console.log({ params });
  const ingred = ingredients.find((ingred) => ingred._id === params.id);

  return (
    <section className={cn(styles.modal, "pt-10 pb-15")}>
      <div className={cn(styles.image_container, "mr-25 ml-25 mb-4")}>
        <img className={cn(styles.image)} src={ingred?.image_large}></img>
      </div>
      <p className={cn(styles.description, "text text_type_main-medium mb-8")}>
        {ingred?.name}
      </p>
      <div className={cn(styles.nutrition_block)}>
        <div className={cn(styles.nutrition_element)}>
          <p
            className={cn(
              "text text_type_main-default text_color_inactive mb-2"
            )}
          >
            Калории,ккал
          </p>
          <p
            className={cn(
              styles.nutrition_figure,
              "text text_type_digits-medium text_color_inactive"
            )}
          >
            {ingred?.calories}
          </p>
        </div>
        <div className={cn(styles.nutrition_element)}>
          <p
            className={cn(
              "text text_type_main-default text_color_inactive mb-2"
            )}
          >
            Белки, г
          </p>
          <p
            className={cn(
              styles.nutrition_figure,
              "text text_type_digits-medium text_color_inactive"
            )}
          >
            {ingred?.proteins}
          </p>
        </div>
        <div className={cn(styles.nutrition_element)}>
          <p
            className={cn(
              "text text_type_main-default text_color_inactive mb-2"
            )}
          >
            Жиры, г
          </p>
          <p
            className={cn(
              styles.nutrition_figure,
              "text text_type_digits-medium text_color_inactive"
            )}
          >
            {ingred?.fat}
          </p>
        </div>
        <div className={cn(styles.nutrition_element)}>
          <p
            className={cn(
              "text text_type_main-default text_color_inactive mb-2"
            )}
          >
            Углеводы, г
          </p>
          <p
            className={cn(
              styles.nutrition_figure,
              "text text_type_digits-medium text_color_inactive"
            )}
          >
            {ingred?.carbohydrates}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FullPage;
