import styles from './ModalOverlay.module.css';
import React from 'react';


const ModalOverlay = ({onClick}) => {
  React.useEffect(() => {
    function closeOnEscape(evt) {
      if (evt.key === 'Escape') {
        onClick();
      }
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
  <div onClick={onClick} className={styles.overlay}></div>
  )
}

export default ModalOverlay;