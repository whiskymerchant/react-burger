import { BurgerIngredient } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

function BurgerIngredientWrap({ data, onClick }) {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0.4 : 1;

  return (
    <article ref={dragRef}>
      <BurgerIngredient
        key={data._id}
        {...data}
        count={data.count}
        style={{ opacity }}
        onClick={onClick}
      />
    </article>
  );
}

BurgerIngredientWrap.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default BurgerIngredientWrap;
