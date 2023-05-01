import React, { FC, ReactNode } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalWindow: HTMLElement | null = document.querySelector('#modals');

type TModal = {
	onClose: () => void;
	children: ReactNode;
};

const Modal: FC<TModal> = ({ onClose, children }) => {
	React.useEffect(() => {
		function closeOnEscape(evt: KeyboardEvent) {
			if (evt.key === 'Escape') {
				onClose();
			}
		}

		function closeOnClick(evt: MouseEvent) {
			const target = evt.target as Element;
			if (target.id === 'overlay') {
				onClose();
			}
		}

		document.addEventListener('keydown', closeOnEscape);
		document.addEventListener('click', closeOnClick);
		return () => {
			document.removeEventListener('click', closeOnClick);
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, []);
	return createPortal(
		<>
			<div className={styles.modal}>
				<button className={styles.close}>
					<CloseIcon type="primary" onClick={onClose} />
				</button>
				{children}
			</div>
			<ModalOverlay onClick={onClose} />
		</>,
		modalWindow as HTMLElement
	);
};

export default Modal;
