import { BurgerIngredient } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../types/ingredientTypes";
import { FC } from "react";
import { TBurgerIngredientWrap } from "./types";

const BurgerIngredientWrap: FC<TBurgerIngredientWrap> = (props) => {
  const { data, onClick } = props;
  const location = useLocation();
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  // let count = null;
  // if (data.count) {
  //   count = data.count;
  // } else count = undefined;

  const opacity = isDrag ? 0.4 : 1;
  console.log(data)
  return (
    <Link
      to={`/ingredient/${data._id}`}
      state={{ background: location }}
      ref={dragRef}
    >
      <BurgerIngredient
        key={data._id}
        {...data}
        count={data.count as number}
        style={{ opacity }}
        onClick={onClick}
      />
    </Link>
  );
};

export default BurgerIngredientWrap;
