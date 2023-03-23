import { BurgerIngredient } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { addConstructor } from "../../services/reducers/constructor";
import { openModal } from "../../services/reducers/currentIngredient";
import { useDrag } from "react-dnd";



function BurgerIngredientWrap({data, onClick, count}){

  // const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  
  const opacity = isDrag ? 0.4 : 1;

  return( 
    <article ref={dragRef}>
      <BurgerIngredient
        key={data._id}
        {...data}
        count={data.count}
        style={{ opacity }}
        onClick={onClick}
      />
    </article>
  )
}

export default BurgerIngredientWrap;