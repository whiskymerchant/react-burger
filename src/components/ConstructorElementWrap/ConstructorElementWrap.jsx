import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  reorderConstructor,
  removeConstructor,
} from "../../services/reducers/constructor";
import cn from "classnames";
import styles from "./ConstructorElementWrap.module.css";
import { useDrag, useDrop } from "react-dnd";
import { decreaseCount } from "../../services/reducers/ingredients";

function ConstructorElementWrap(data, index) {
  const ref = useRef();
  const dispatch = useDispatch();

  const [{ isDragSorted }, dragRefSorted] = useDrag({
    type: "sorted",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragSorted: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropTarget] = useDrop({
    accept: "sorted",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      console.log(item);
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

  dragRefSorted(dropTarget(ref));

  return (
    <div ref={ref} className={cn(styles.constructor_container)}>
      <DragIcon className={cn(styles.dragicon)} type="primary" />
      <ConstructorElement
        thumbnail={data.image}
        key={data.id}
        text={data.name}
        handleClose={() => {
          dispatch(decreaseCount(data._id));
          dispatch(removeConstructor(data.id));
        }}
        {...data}
      />
    </div>
  );
}

export default ConstructorElementWrap;
