import { TIngredient } from "../../types/ingredientTypes";
import { MouseEvent } from "react";

export type TBurgerIngredientWrap = {
  data: TIngredient & { count?: number };
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
};
