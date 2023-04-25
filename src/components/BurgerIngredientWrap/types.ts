import { TIngredient } from "../../types/ingredientTypes";
import { MouseEvent } from "react";

export type TBurgerIngredientWrap = {
  data: TIngredient;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
};
