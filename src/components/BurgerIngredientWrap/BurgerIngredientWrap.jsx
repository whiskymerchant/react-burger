import { BurgerIngredient } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

function BurgerIngredientWrap({ data, onClick }) {
  const location = useLocation();
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  let count = null;
  if (data.count) {
    count = data.count;
  } else count = undefined;

  const opacity = isDrag ? 0.4 : 1;

  return (
    <Link to={`/ingredient/${data._id}`} state={{background: location}}ref={dragRef}>
      <BurgerIngredient
        key={data._id}
        {...data}
        count={count}
        style={{ opacity }}
        onClick={onClick}
      />
    </Link>
  );
}

BurgerIngredientWrap.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default BurgerIngredientWrap;
