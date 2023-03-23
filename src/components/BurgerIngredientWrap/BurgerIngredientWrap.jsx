import { BurgerIngredient } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { openModal } from "../../services/reducers/currentIngredient";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { reorderConstructor } from "../../services/reducers/constructor";

function BurgerIngredientWrap({
  data,
  onClick,
  ref,
  index,
  id
}) {
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0.4 : 1;

  const [{ isDragSorted }, dragRefSorted] = useDrag({
    type: "sorted",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragSorted: monitor.isDragging(),
    }),
  });
  // drag(drop(ref))

  const [{ isHover }, dropTarget] = useDrop({
    accept: "sorted",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(reorderConstructor({ from: dragIndex, to: hoverIndex }));
      item.index = hoverIndex;
    },
  });

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

export default BurgerIngredientWrap;
