import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import IngredientCategory from "../IngredientCategory/IngredientCategory";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useInView } from "react-intersection-observer";
import { closeModal } from "../../services/reducers/currentIngredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

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
    if (ingredientName) {
      ingredientName.scrollIntoView({ behavior: "smooth" });
    }
  }
  const { ref: refBuns, inView: inViewBuns } = useInView();
  const { ref: refSauce, inView: inViewSauce } = useInView();
  const { ref: refMains, inView: inViewMains } = useInView();

  const dispatch = useDispatch();
  const currentIngredient = useSelector((state) => state.currentIngredient);

  React.useEffect(() => {
    if (inViewBuns) {
      return setCurrent("bun");
    }
    if (inViewSauce) {
      return setCurrent("sauce");
    }
    if (inViewMains) {
      return setCurrent("main");
    }
  }, [inViewBuns, inViewSauce, inViewMains]);

  return (
    <section className={cn(styles.section)}>
      <p className={cn("text text_type_main-large mt-10 mb-5")}>
        Соберите бургер
      </p>
      <div className={cn(styles.selector, "mb-10")}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={switchIngredientsTab}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={switchIngredientsTab}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={switchIngredientsTab}
        >
          Начинки
        </Tab>
      </div>

      <section className={cn(styles.ingredients, "custom-scroll")}>
        <IngredientCategory
          title="Булки"
          id="bun"
          ingredients={breads}
          ref={refBuns}
        />
        <IngredientCategory
          title="Соусы"
          id="sauce"
          ingredients={sauces}
          ref={refSauce}
        />
        <IngredientCategory
          title="Начинки"
          id="main"
          ingredients={ingred}
          ref={refMains}
        />
      </section>
      {currentIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch(closeModal())}
        >
          <IngredientDetails data={currentIngredient} />
        </Modal>
      )}
    </section>
  );
};
export default BurgerIngredients;
