import { FC } from "react";
import styles from "./IngredientBar.module.css";
import { TIngredient } from "../../types/ingredientTypes";
import { RoundIcon } from "../RoundIcon/RoundIcon";

interface IIngredientBar {
    ingredients: TIngredient[];
}

export const IngredientBar: FC<IIngredientBar> = ({ ingredients }) => {
    return (
        <div className={styles.container}>
            {ingredients.map((el, index) => {
                if (el) {
                    if (index < 4)
                        return (
                            <RoundIcon
                                key={el._id}
                                img={el.image_mobile}
                            />
                        );
                    if (index === 4) {
                        return (
                            <RoundIcon
                                key={el._id}
                                img={el.image_mobile}
                                count={ingredients.length - index}
                            />
                        );
                    }
                }
            })}
        </div>
    );
};

