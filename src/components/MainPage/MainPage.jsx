import React from "react";
import styles from "./MainPage.module.css";

import { DndProvider } from "react-dnd";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import cn from "classnames";
import { HTML5Backend } from "react-dnd-html5-backend";

const MainPage = () => {
  return (
    <main className={cn(styles.main)}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};

export default MainPage;
