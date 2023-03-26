import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import IngredientCategory from "../IngredientCategory/IngredientCategory";

import { useSelector } from "react-redux/es/exports";

const BurgerIngredients = () => {
  const ingredients = useSelector((state) => state.ingredientsStore.data);
  const [current, setCurrent] = React.useState("bun");
  const breads = React.useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const sauces = React.useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );
  const ingred = React.useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

  function switchIngredientsTab(tab) {
    setCurrent(tab);
    const ingredientName = document.getElementById(tab);
    if (ingredientName) ingredientName.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className={cn(styles.section)}>
      <p className={cn("text text_type_main-large mt-10 mb-5")}>
        Соберите бургер
      </p>
      <div className={cn(styles.selector, "mb-10")}>
        <Tab
          value="breads"
          active={current === "breads"}
          onClick={switchIngredientsTab}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={switchIngredientsTab}
        >
          Соусы
        </Tab>
        <Tab
          value="ingred"
          active={current === "ingred"}
          onClick={switchIngredientsTab}
        >
          Начинки
        </Tab>
      </div>
      <section className={cn(styles.ingredients, "custom-scroll")}>
        <IngredientCategory title="Булки" id="breads" ingredients={breads} />
        <IngredientCategory title="Соусы" id="sauces" ingredients={sauces} />
        <IngredientCategory title="Начинки" id="ingred" ingredients={ingred} />
      </section>
    </section>
  );
};

export default BurgerIngredients;
