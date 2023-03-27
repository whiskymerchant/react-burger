import styles from './ModalOverlay.module.css';
import PropTypes from "prop-types";


const ModalOverlay = ({onClick}) => {
  
  return (
  <div onClick={onClick} className={styles.overlay}></div>
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
}

export default ModalOverlay;