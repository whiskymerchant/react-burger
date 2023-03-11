import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalWindow = document.querySelector('#modals')

const Modal = ({title, onClose, children}) => {
  return createPortal (
    <>
      <section className={cn(styles.modal)}>
        <div className={cn(styles.header_block, 'ml-10 mt-10 mr-10')}>
          <h2 className={cn(styles.title, 'text text_type_main-large ')}>{title}</h2>
          <CloseIcon className={cn(styles.close)} onClick={onClose}/>
        </div>

      {children}
      </section>
      <ModalOverlay className={cn(styles.overlay)} onClick={onClose} />
    </>,
    modalWindow
  )
}

export default Modal;