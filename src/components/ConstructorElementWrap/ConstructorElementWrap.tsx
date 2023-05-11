import {
	ConstructorElement,
	DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import {
	reorderConstructor,
	removeConstructor
} from '../../services/reducers/constructor';
import cn from 'classnames';
import styles from './ConstructorElementWrap.module.css';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { decreaseCount } from '../../services/reducers/ingredients';
import { useAppDispatch } from '../../utils/hooks';
import { TIngredient } from '../../types/ingredientTypes';

function ConstructorElementWrap({
	data,
	index
}: {
	data: TIngredient;
	index: number;
}) {
	const ref = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	const [{ isDragSorted }, dragRefSorted] = useDrag({
		type: 'sorted',
		item: () => {
			return { index };
		},
		collect: (monitor) => ({
			isDragSorted: monitor.isDragging()
		})
	});

	const [{ handlerId }, dropTarget] = useDrop({
		accept: 'sorted',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId()
			};
		},
		hover(item: any, monitor) {
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
			const clientOffset: XYCoord | null = monitor.getClientOffset();
			const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			dispatch(reorderConstructor({ from: dragIndex, to: hoverIndex }));
			item.index = hoverIndex;
		}
	});

	dragRefSorted(dropTarget(ref));

	return (
		<div ref={ref} className={cn(styles.constructor_container)}>
			<DragIcon type="primary" />
			<ConstructorElement
				price={data.price}
				thumbnail={data.image}
				key={data.id}
				text={data.name}
				handleClose={() => {
					dispatch(decreaseCount(data._id));
					dispatch(removeConstructor(data.id));
				}}
			/>
		</div>
	);
}

export default ConstructorElementWrap;
